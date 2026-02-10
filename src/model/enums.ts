export const WeightUnit = {
    Pounds: "Pounds",
    Ounces: "Ounces",
    Kilograms: "Kilograms",
    Grams: "Grams",
    Stones: "Stones"
} as const;

export const DurationUnit = {
    Seconds : "Seconds",
    Minutes : "Minutes",
    Hours :"Hours"
} as const;

export const DistanceUnit = {
    Feet : "Feet",
    Yards : "Yards",
    Miles : "Miles",
    Meters : "Meters",
    Kilometers : "Kilometers",
    Laps : "Laps"
} as const;

export type WeightUnit = typeof WeightUnit[keyof typeof WeightUnit];
export type DurationUnit = typeof DurationUnit[keyof typeof DurationUnit];
export type DistanceUnit = typeof DistanceUnit[keyof typeof DistanceUnit];