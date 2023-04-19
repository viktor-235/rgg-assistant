export interface IAbstractModifier {
    id: number,
    name: string,
    description: string,
    modifierType: ModifierType
}

export enum ModifierType {
    ITEM = "item",
    EFFECT = "effect"
}

export interface IEffect extends IAbstractModifier {
    type: EffectType
}

export enum EffectType {
    POSITIVE = "POSITIVE",
    NEGATIVE = "NEGATIVE",
    NEUTRAL = "NEUTRAL"
}

export interface IItem extends IAbstractModifier {
}

export interface ICollectedEffect {
    id: number,
    effect: IEffect
}

export interface ICollectedItem {
    id: number,
    item: IItem
}
