import { IAbstractWheelElement } from "./CommonTypes"

export interface IAbstractModifier extends IAbstractWheelElement {
    name: string,
    description: string,
    modifierType: ModifierType
}

export enum ModifierType {
    ITEM = "ITEM",
    EFFECT = "EFFECT"
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
