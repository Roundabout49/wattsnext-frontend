import pandas as pd
import json
from pathlib import Path

script_dir = Path(__file__).parent
excel_path = (script_dir / "../src/assets/cards.xlsx").resolve()
output_path = (script_dir / "../src/data/cards.ts").resolve()

df = pd.read_excel(excel_path, sheet_name="Übersicht_neu")

def get_card_type(kategorie: str) -> str:
    return "climateAction" if isinstance(kategorie, str) and kategorie.lower().startswith("klima") else "technology"

def get_technology(kategorie: str) -> str:
    if isinstance(kategorie, str):
        if kategorie.lower().startswith("erzeugung"):
            return "Generation"
        elif kategorie.lower().startswith("verteilung"):
            return "Distribution"
        elif kategorie.lower().startswith("speicher"):
            return "Storage"
    return "Other"

def get_energy(energieform: str) -> str:
    if isinstance(energieform, str):
        if energieform.lower().startswith("strom"):
            return "Electricity"
        elif energieform.lower().startswith("wärme"):
            return "Heat"
    return "Other"

def get_achievement(name: str) -> str:
    if name == "CCS":
        return "CarbonCapture"
    elif name == "Chemie":
        return "ChemicalEnergy"
    elif name == "Endlager":
        return "NuclearWasteRepository"
    else:
        return "Unknown"

def build_supply_from_parts(parts, size):
    if len(parts) == 2:
        tech_de, energy_de = parts
        return {
            "type": "energy",
            "technology": get_technology(tech_de),
            "form": get_energy(energy_de),
            "size": int(size),
            "fulfilled": None
        }
    elif len(parts) == 1:
        return {
            "type": "achievement",
            "name": get_achievement(parts[0]),
            "fulfilled": None
        }
    else:
        return {"type": "never", "fulfilled": False}

# Hilfsfunktion für ModifiableValue
def mv(val):
    return {"originalValue": val, "modifiedValue": val, "modifications": []}

cards = {}

for _, row in df.iterrows():
    card_id = row['Name Text Placeholder 3']
    if not isinstance(card_id, str) or not card_id.strip():
        continue

    card_type = get_card_type(row['Kategorie'])

    # Bedingungen (conditions)
    conditions = []
    for i in range(1, 4):
        cond_val = row.get(f"Bildpfad Vorraussetzung {i} Picture Placeholder {18+2*i-1}")
        if isinstance(cond_val, str) and cond_val.strip():
            parts = cond_val.split()
            size = row.get(f"Vorraussetzung {i} Energieeinheit", 0)
            conditions.append(build_supply_from_parts(parts, size))

    # ProgressPoints als ModifiableValue
    pp = {
        "baseProgressPoints": int(row.get("Basispunkte Text Placeholder 7", 0)),
        "systemProgressPoints": int(row.get("Systempunkte Text Placeholder 8", 0)),
        "conditions": conditions,
        "conditionsFulfilled": False
    }

    card_data = {
        "id": card_id,
        "name": card_id,
        "image": "",
        "text": "" if pd.isna(row.get("Voraussetzung Text Text Placeholder 9", "")) else row.get("Voraussetzung Text Text Placeholder 9", ""),
        "explanation": row.get("Infotext", ""),
        "moneyCosts": mv(int(row.get("Kosten Text Placeholder 4", 0))),
        "resourceCosts": mv(int(row.get("Ressourcen Text Placeholder 5", 0))),
        "points": mv(pp),   # <-- jetzt ModifiableValue
        "isPlayable": True,
        "type": card_type,
    }

    if card_type == "technology":
        card_data["supply"] = {
            "type": "energy",
            "technology": get_technology(row['Kategorie']),
            "form": get_energy(row['Energieform']),
            "size": int(row.get("Energieeinheiten Text Placeholder 6", 0)),
            "fulfilled": None
        }
    elif card_type == "climateAction":
        # TODO: falls supply auch aus Excel kommt
        pass

    cards[card_id] = card_data

with open(output_path, "w", encoding="utf-8") as f:
    f.write("import { ProgressCard } from '../types/ProgressCards';\n\n")
    f.write("export const cards: Record<string, ProgressCard> = ")
    json.dump(cards, f, indent=2, ensure_ascii=False)
    f.write(";")
