import pandas as pd
import json
from pathlib import Path

script_dir = Path(__file__).parent
excel_path = script_dir / "../src/assets/cards.xlsx"
excel_path = excel_path.resolve()

output_path = script_dir / "../src/data/cards.ts"
output_path = output_path.resolve()

df = pd.read_excel(excel_path, sheet_name="Übersicht_neu")

def get_card_type(kategorie: str) -> str:
    return "climateAction" if kategorie.lower().startswith("klima") else "technology"

def get_technology(kategorie: str) -> str:
    if kategorie.lower().startswith("erzeugung"):
        return "Generation"
    elif kategorie.lower().startswith("verteilung"):
        return "Distribution"
    elif kategorie.lower().startswith("speicher"):
        return "Storage"
    else:
        return "other"
    
def get_energy(energieform: str) -> str:
    if energieform.lower().startswith("strom"):
        return "Electricity"
    elif energieform.lower().startswith("wärme"):
        return "Heat"
    else:
        return "other"
    
def get_icon(condition: str) -> str:
    if condition == "CCS":
        return "CarbonCapture"
    elif condition == "Chemie":
        return "ChemicalEnergy"
    elif condition == "Endlager":
        return "NuclearWasteRepository"
    else:
        return "Unknown"

cards = {}

for _, row in df.iterrows():
    card_id = row['Name Text Placeholder 3']
    if not isinstance(card_id, str) or card_id.strip() == "":
        continue

    card_type = get_card_type(row['Kategorie'])

    card_data = {
        "title": card_id,
        # TODO
        "image": '',
        "text": '' if (isinstance(val := row.get('Voraussetzung Text Text Placeholder 9', ''), float) and pd.isna(val)) else val,
        "explanation": row.get('Infotext', ''),
        "price": int(row.get('Kosten Text Placeholder 4', 0)),
        "resources": int(row.get('Ressourcen Text Placeholder 5', 0)),
        "type": card_type,
    }

    if card_type == "technology":
        card_data["energyCharacteristics"] = {
            "technology": get_technology(row['Kategorie']),
            "energy": get_energy(row['Energieform']),
            "size": int(row.get('Energieeinheiten Text Placeholder 6', 0))
        }

    # conditions for system points
    conditions = []

    fst_condition = row.get("Bildpfad Vorraussetzung 1 Picture Placeholder 19")
    if fst_condition and isinstance(fst_condition, str) and fst_condition != "":
        parts = row["Bildpfad Vorraussetzung 1 Picture Placeholder 19"].split()
        if len(parts) == 2:
            tech_de, energy_de = parts
            technology = get_technology(tech_de)
            energy = get_energy(energy_de)
            conditions.append({
                "technology": technology,
                "energy": energy,
                "size": int(row.get("Vorraussetzung 1 Energieeinheit", 0)),
            })
        elif len(parts) == 1:
            conditions.append(get_icon(parts[0]))

    snd_condition = row.get("Bildpfad Vorraussetzung 2 Picture Placeholder 21")
    if snd_condition and isinstance(snd_condition, str) and snd_condition != "":
        parts = row["Bildpfad Vorraussetzung 2 Picture Placeholder 21"].split()
        if len(parts) == 2:
            tech_de, energy_de = parts
            technology = get_technology(tech_de)
            energy = get_energy(energy_de)
            conditions.append({
                "technology": technology,
                "energy": energy,
                "size": int(row.get("Vorraussetzung 2 Energieeinheit", 0)),
            })
        elif len(parts) == 1:
            conditions.append(get_icon(parts[0]))

    trd_condition = row.get("Bildpfad Vorraussetzung 3 Picture Placeholder 23")
    if trd_condition and isinstance(trd_condition, str) and trd_condition != "":
        parts = row["Bildpfad Vorraussetzung 3 Picture Placeholder 23"].split()
        if len(parts) == 2:
            tech_de, energy_de = parts
            technology = get_technology(tech_de)
            energy = get_energy(energy_de)
            conditions.append({
                "technology": technology,
                "energy": energy,
                "size": int(row.get("Vorraussetzung 3 Energieeinheit", 0)),
            })
        elif len(parts) == 1:
            conditions.append(get_icon(parts[0]))
    
    card_data["points"] = {
        "basePoints": int(row.get("Basispunkte Text Placeholder 7", 0)),
        "systemPoints": int(row.get("Systempunkte Text Placeholder 8", 0)),
        "conditions": conditions
    }

    cards[card_id] = card_data

# Ausgabe in eine TypeScript-Datei
with open(output_path, "w", encoding="utf-8") as f:
    f.write("import { ProgressCardProps } from '../types/ProgressCards';\n\n")
    f.write("export const cards: Record<string, ProgressCardProps> = ")
    json.dump(cards, f, indent=2, ensure_ascii=False)
    f.write(";")
