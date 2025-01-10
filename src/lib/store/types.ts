type Styling = {
	// Font for the text.
	rowTitle: string; // The font for the row-titles.
	rowText: string; // The font for the row-under-text.
	objectTitle: string; // The font for the object-titles.
	objectText: string; // The font for the object-under-text.
	addonTitle: string; // The font for the object-titles.
	addonText: string; // The font for the object-under-text.

	// Size for the text.
	rowTitleTextSize: number | string;
	rowTextTextSize: number | string;
	objectTitleTextSize: number | string;
	objectTextTextSize: number | string;
	addonTitleTextSize: number | string;
	addonTextTextSize: number | string;

	barTextColor: string;
	barBackgroundColor: string;
	barTextPadding: number | string;
	barTextMargin: number | string;
	barTextFont: string;
	barTextSize: number | string;
	barPadding: number | string;
	barMargin: number | string;

	// Colors for the text.
	rowTitleColor: string;
	rowTextColor: string;
	objectTitleColor: string;
	objectTextColor: string;
	addonTitleColor: string;
	addonTextColor: string;
	objectHeight: boolean;

	rowTitleAlign: string;
	rowTextAlign: string;
	objectTitleAlign: string;
	objectTextAlign: string;
	addonTitleAlign: string;
	addonTextAlign: string;

	// Background image and color.
	backgroundImage: string;
	rowBackgroundImage: string;
	objectBackgroundImage: string;
	backgroundColor: string;
	objectBgColor: string;
	rowBgColor: string;

	// Boolean that says if the row or object-color will be viewed.
	rowBgColorIsOn: boolean;
	objectBgColorIsOn: boolean;

	// Image radius and width
	objectImageWidth: number | string;
	rowImageWidth: number | string;

	// Margin and padding
	objectMargin: number | string;
	rowMargin: number | string;
	rowTextPaddingY: number | string;
	rowTextPaddingX: number | string;
	objectTextPadding: number | string;

	rowBodyMarginTop: number | string;
	rowBodyMarginBottom: number | string;
	rowBodyMarginSides: number | string;

	// Style Drop Shadow Object
	objectDropShadowH: number | string;
	objectDropShadowV: number | string;
	objectDropShadowSpread: number | string;
	objectDropShadowBlur: number | string;
	objectDropShadowColor: string;
	objectDropShadowIsOn: boolean;

	// Style Drop Shadow Row
	rowDropShadowH: number;
	rowDropShadowV: number;
	rowDropShadowSpread: number;
	rowDropShadowBlur: number | string;
	rowDropShadowColor: string;
	rowDropShadowIsOn: boolean;

	// Selected Filter
	selFilterBlurIsOn: boolean;
	selFilterBlur: number | string;
	selFilterBrightIsOn: boolean;
	selFilterBright: number | string;
	selFilterContIsOn: boolean;
	selFilterCont: number;
	selFilterGrayIsOn: boolean;
	selFilterGray: number;
	selFilterHueIsOn: boolean;
	selFilterHue: number | string;
	selFilterInvertIsOn: boolean;
	selFilterInvert: number | string;
	selFilterOpacIsOn: boolean;
	selFilterOpac: number | string;
	selFilterSaturIsOn: boolean;
	selFilterSatur: number;
	selFilterSepiaIsOn: boolean;
	selFilterSepia: number;
	selBgColorIsOn: boolean;
	selFilterBgColor: string;
	selBorderColorIsOn: boolean;
	selCTextColorIsOn: boolean;

	// Required Filter
	reqFilterBlurIsOn: boolean;
	reqFilterBlur: number;
	reqFilterBrightIsOn: boolean;
	reqFilterBright: number | string;
	reqFilterContIsOn: boolean;
	reqFilterCont: number | string;
	reqFilterGrayIsOn: boolean;
	reqFilterGray: number | string;
	reqFilterHueIsOn: boolean;
	reqFilterHue: number | string;
	reqFilterInvertIsOn: boolean;
	reqFilterInvert: number;
	reqFilterOpacIsOn: boolean;
	reqFilterOpac: number | string;
	reqFilterSaturIsOn: boolean;
	reqFilterSatur: number | string;
	reqFilterSepiaIsOn: boolean;
	reqFilterSepia: number | string;
	reqBgColorIsOn: boolean;
	reqFilterBgColor: string;
	reqFilterVisibleIsOn: boolean;

	objectDesignIsAdvanced?: boolean;
	rowDesignIsAdvanced?: boolean;
	rowImageMarginBottom?: number | string;
	rowImgOverflowIsOn?: boolean;
	barPointPos?: Colors;
	barPointNeg?: Colors;
	objectGradientIsOn?: boolean;
	objectGradient?: string;
	rowGradientIsOn?: boolean;
	rowGradient?: string;
	rowImageBorderRadius?: number;
	objectImageBorderRadius?: number;
	multiChoiceTextSize?: number | string;
	multiChoiceTextFont?: string;
	objectImgObjectFillIsOn?: boolean;
	objectImgObjectFillStyle?: string;
	objectImgOverflowIsOn?: boolean;
	isBackgroundRepeat?: boolean;
	barIconColor?: string;
	selFilterBorderColor?: string;
	selFilterCTitleColor?: string;
	selFilterCTextColor?: string;
	selFilterATitleColor?: string;
	selFilterATextColor?: string;
	reqFilterBorderColor?: string;
	reqFilterCTitleColor?: string;
	reqFilterCTextColor?: string;
	reqFilterATitleColor?: string;
	reqFilterATextColor?: string;
	rowBorderImage?: string;
	rowBorderImageSliceTop?: number | string;
	rowBorderImageSliceRight?: number | string;
	rowBorderImageSliceBottom?: number | string;
	rowBorderImageSliceLeft?: number | string;
	rowBorderImageWidth?: number | string;
	rowBorderImageRepeat?: string;
	objectBorderImage?: string;
	objectBorderImageSliceTop?: number | string;
	objectBorderImageSliceRight?: number | string;
	objectBorderImageSliceBottom?: number | string;
	objectBorderImageSliceLeft?: number | string;
	objectBorderImageWidth?: number | string;
	objectBorderImageRepeat?: string;
	objectGradientOnSelect?: string;
	objectGradientOnReq?: string;
	objectImgObjectFillHeight?: number | string;
};

type Colors = {
	alpha: number;
	hex: string;
	hexa: string;
	hsla: {
		h: number;
		s: number;
		l: number;
		a: number;
	};
	hsva: {
		h: number;
		s: number;
		v: number;
		a: number;
	};
	hue: number;
	rgba: {
		r: number;
		g: number;
		b: number;
		a: number;
	};
};

export type Object = {
	id: string;
	title: string;
	text: string;
	image: string;
	template: number | string;
	objectWidth: string;
	isActive: boolean | number;
	isVisible: boolean;
	multipleUseVariable?: number;
	selectedThisManyTimesProp?: number;
	defaultAspectWidth: number | string;
	defaultAspectHeight: number | string;
	requireds: Requireds[];
	addons: {
		id: string;
		title: string;
		text: string;
		template: string;
		image: string;
		requireds: Requireds[];
		defaultAspectWidth?: number | string;
		defaultAspectHeight?: number | string;
		imageSourceTooltip?: string;
	}[];
	scores: {
		id: string;
		value: string | number;
		type: string;
		requireds: Requireds[];
		beforeText: string;
		afterText: string;
		showScore: boolean;
		isActive?: boolean;
	}[];
	groups: { id: string }[];
	deactivateOtherChoice?: boolean;
	deactivateThisChoice?: string;
  activateOtherChoice?: boolean;
  activateThisChoice?: string;
  isNotDeactivate?: boolean;
	multiplyPointtypeIsOn?: boolean;
	multiplyPointtypeIsOnCheck?: boolean;
	pointTypeToMultiply?: string;
	multiplyPointtypeIsId?: boolean;
	multiplyWithThis?: number | string;
	startingSumAtMultiply?: number;
	multipleScoreId?: string;
	numMultipleTimesMinus?: number | string;
	numMultipleTimesPluss?: number | string;
	isImageUpload?: boolean;
	textfieldIsOn?: boolean;
	isNotSelectable?: boolean;
	addToAllowChoice?: boolean;
	idOfAllowChoice?: string;
	numbAddToAllowChoice?: number;
	dividePointtypeIsOn?: boolean;
	dividePointtypeIsOnCheck?: boolean;
	pointTypeToDivide?: string;
	divideWithThis?: number | string;
	isSelectableMultiple?: boolean;
	isMultipleUseVariable?: boolean;
	cleanACtivatedOnSelect?: boolean;
	isPrivateStyling?: boolean;
	styling?: Styling;
	forcedActivated?: boolean;
	isAllowDeselect?: boolean;
	idOfTheTextfieldWord?: string;
	wordChangeSelect?: string;
	wordChangeDeselect?: string;
	randomWeight?: number | string;
	isButtonObject?: boolean;
	imageSourceTooltip?: string;
};

export type App = {
	isEditModeOnAll: boolean;
	isStyleOpen: boolean;
	isPointsOpen: boolean;
	isChoicesOpen: boolean;
	isDesignOpen: boolean;
	isViewerVersion: boolean;
	backpack: {
		id: string;
		title: string;
		titleText: string;
		objectWidth: string;
		image: string;
		template: string;
		isButtonRow: boolean;
		buttonType: boolean;
		buttonId: string;
		buttonText: string;
		buttonRandom: boolean;
		buttonRandomNumber: number;
		isResultRow: boolean;
		resultGroupId: string;
		isInfoRow: boolean;
		isPrivateStyling: boolean;
		defaultAspectWidth: number | string;
		defaultAspectHeight: number | string;
		allowedChoices: number;
		currentChoices: number;
		requireds: Requireds[];
		isEditModeOn: boolean;
		isRequirementOpen: boolean;
		objects: Object[];
		styling: Styling;
		textIsRemoved?: boolean;
		rowJustify?: string;
		resultShowRowTitle?: boolean;
		choicesShareTemplate?: boolean;
		deselectChoices?: boolean;
		width?: boolean;
		imageSourceTooltip?: string;
		onlyIfNoChoices?: boolean;
		isWeightedRandom?: boolean;
		onlyUnselectedChoices?: boolean;
		btnPointAddon?: boolean;
		buttonTypeRadio?: string;
		randomMin?: number;
		randomMax?: number;
		pointTypeRandom?: string;
	}[];
	words: { id: string; replaceText: string }[];
	groups: {
		id: string;
		rowType?: string;
		name: string;
		elements: {
			id: string;
		}[];
	}[];
	chapters: {
		pages: { app: App; children: App['chapters'][0]['pages'] }[];
	}[];
	activated: string[];
	rows: {
		id: string;
		title: string;
		titleText: string;
		objectWidth: string;
		image: string;
		template: string;
		isButtonRow: boolean;
		buttonType: boolean;
		buttonId: string;
		buttonText: string;
		buttonRandom: boolean;
		buttonRandomNumber: number;
		isResultRow: boolean;
		resultGroupId: string | null;
		isInfoRow: boolean;
		isPrivateStyling: boolean;
		defaultAspectWidth: number | string;
		defaultAspectHeight: number | string;
		allowedChoices: number | string;
		currentChoices: number;
		requireds: Requireds[];
		isEditModeOn: boolean;
		isRequirementOpen: boolean;
		objects: Object[];
		styling: Styling;
		rowJustify?: string;
		width?: boolean;
		deselectChoices?: boolean;
		resultShowRowTitle?: boolean;
		allowedChoicesChange?: number;
		buttonTypeRadio?: string;
		onlyUnselectedChoices?: boolean;
		imageSourceTooltip?: string;
		onlyIfNoChoices?: boolean;
		isWeightedRandom?: boolean;
		choicesShareTemplate?: boolean;
		textIsRemoved?: boolean;
		btnPointAddon?: boolean;
		randomMin?: number;
		randomMax?: number;
		pointTypeRandom?: string;
	}[];
	pointTypes: {
		id: string;
		name: string;
		startingSum: number | string;
		activatedId: string;
		afterText: string;
		beforeText: string;
		belowZeroNotAllowed?: boolean;
		iconIsOn?: boolean;
		pointColorsIsOn?: boolean;
		positiveColor?: Colors;
		negativeColor?: Colors;
		plussOrMinusAdded?: boolean;
		plussOrMinusInverted?: boolean;
		image?: string;
		imageSidePlacement?: boolean;
		imageOnSide?: boolean;
		iconWidth?: number | string;
		iconHeight?: number | string;
	}[];
	variables: { id: string; isTrue: boolean }[];

	defaultRowTitle: string;
	defaultRowText: string;
	defaultChoiceTitle: string;
	defaultChoiceText: string;
	defaultBeforePoint: string;
	defaultAfterPoint: string;
	defaultBeforeReq: string;
	defaultAfterReq: string;
	defaultAddonTitle: string;
	defaultAddonText: string;

	styling: Styling & {
		scoreText: string;
		scoreTextSize: number | string;
		scoreTextColor: string;
		scoreTextAlign: string;

		rowButtonXPadding: number;
		rowButtonYPadding: number;

		objectImageMarginTop: number | string;
		objectImageMarginBottom: number | string;
		rowImageMarginTop: number | string;

		objectBorderRadiusTopLeft: number;
		objectBorderRadiusTopRight: number;
		objectBorderRadiusBottomRight: number;
		objectBorderRadiusBottomLeft: number;
		objectBorderRadiusIsPixels: boolean;
		objectOverflowIsOn?: boolean;

		objectBorderIsOn: boolean;
		objectBorderColor: string;
		objectBorderStyle: string;
		objectBorderWidth: number;

		objectImgBorderRadiusTopLeft: number;
		objectImgBorderRadiusTopRight: number;
		objectImgBorderRadiusBottomRight: number;
		objectImgBorderRadiusBottomLeft: number;
		objectImgBorderRadiusIsPixels: boolean;

		objectImgBorderIsOn: boolean;
		objectImgBorderColor: string;
		objectImgBorderStyle: string;
		objectImgBorderWidth: number;

		rowImgBorderRadiusTopLeft: number;
		rowImgBorderRadiusTopRight: number;
		rowImgBorderRadiusBottomRight: number;
		rowImgBorderRadiusBottomLeft: number;
		rowImgBorderRadiusIsPixels: boolean;

		rowImgBorderIsOn: boolean;
		rowImgBorderColor: string;
		rowImgBorderStyle: string;
		rowImgBorderWidth: number;

		rowBorderIsOn: boolean;
		rowBorderColor: string;
		rowBorderStyle: string;
		rowBorderWidth: number;

		rowBorderRadiusTopLeft: number;
		rowBorderRadiusTopRight: number;
		rowBorderRadiusBottomRight: number;
		rowBorderRadiusBottomLeft: number;
		rowBorderRadiusIsPixels: boolean;
		rowOverflowIsOn: boolean;

		backPackWidth: number;
	};
	importedChoicesIsOpen?: boolean;
};

export type Requireds = {
	required: boolean;
	requireds: Requireds[];
	orRequired: { req: string }[];
	id: string;
	type: string;
	reqId: string;
	reqId1: string;
	reqId2: string;
	reqId3: string;
	reqPoints: number | string;
	showRequired: boolean;
	operator: number | string;
	afterText: string;
	beforeText: string;
	orNum?: number;
	startingSum?: string;
};

export type Row = App['rows'][0];
export type Backpack = App['backpack'][0];
export type PointType = App['pointTypes'][0];
export type Addon = Object['addons'][0];
export type Score = Object['scores'][0];
