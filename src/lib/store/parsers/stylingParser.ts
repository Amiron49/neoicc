import type { Styling } from '$lib/store/types';

export function parseStyling(input: Styling): void {
    input.objectDesignIsAdvanced = input.objectDesignIsAdvanced ?? false;
    input.rowDesignIsAdvanced = input.rowDesignIsAdvanced ?? false;
    input.rowImgOverflowIsOn = input.rowImgOverflowIsOn ?? false;
    input.objectGradientIsOn = input.objectGradientIsOn ?? false;
    input.rowGradientIsOn = input.rowGradientIsOn ?? false;
    input.objectImgObjectFillIsOn = input.objectImgObjectFillIsOn ?? false;
    input.objectImgOverflowIsOn = input.objectImgOverflowIsOn ?? false;
    input.isBackgroundRepeat = input.isBackgroundRepeat ?? false;
}