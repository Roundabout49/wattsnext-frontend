import math

def generate_star_points(sides, r_outer, r_inner):
    points = []
    angle_step = math.pi / sides  # 360° / (2 * sides)

    for i in range(2 * sides):
        r = r_outer if i % 2 == 0 else r_inner
        angle = i * angle_step
        x = round(r * math.cos(angle), 2)
        y = round(-r * math.sin(angle), 2)  # SVG: positive y nach unten
        points.append(f"{x},{y}")

    return " ".join(points)

# Beispiel: Achtzackiger Stern mit Außenradius 90 und Innenradius 40
star_points = generate_star_points(sides=7, r_outer=50, r_inner=40)
print(star_points)
