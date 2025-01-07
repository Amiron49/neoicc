import type { App } from './types';

export const app = $state<App>({
	// If an object is activated
	isEditModeOnAll: true, // If the editmode is open.
	isStyleOpen: false, // If the style is open.
	isPointsOpen: false, // If the points is open.
	isChoicesOpen: false, // If the choice is open.
	isDesignOpen: false,
	isViewerVersion: false,
	backpack: [],
	words: [],
	groups: [],
	chapters: [],
	activated: [], // The array that holds the id's of the selected objects.
	rows: [], // The rows that the user have been created.
	pointTypes: [], // The pointtypes that the user have created.
	variables: [], // The variables that the user have created.

	// The defaults that will fill the various text boxes.
	defaultRowTitle: 'Row',
	defaultRowText:
		"This is a row, and inside of it, you can place choices. On both rows and choices Requirements can be placed, which will a row from being viewed, or make the player unable to select a choice, depending on either Point-types or the Ids of other choices. Point-types can be made in Features then Manage Points. Hovering over buttons will explain what they do. The Design of the project can be changed in 'Modify Design' at the side navigation bar, and private styling for each row can be turned on in the rows Settings. Default text like this can be turned off in Features -> Manage Defaults. block",
	defaultChoiceTitle: 'Choice',
	defaultChoiceText:
		'This is a Choice, and inside of it, you can place images and text. Scores can be added to it, and have Point-types attached. Addons can be added underneath the image and text. In the Functions at the bottom of the choice, there is an array of different things that can be done. Default text like this can be turned off in Features then Manage Defaults.',
	defaultBeforePoint: 'Cost:',
	defaultAfterPoint: 'points',
	defaultBeforeReq: 'Required:',
	defaultAfterReq: 'choice',
	defaultAddonTitle: 'Addon',
	defaultAddonText:
		"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",

	// The styling that has to be done in the row.
	styling: {
		// Font for the text.
		rowTitle: 'Times New Roman', // The font for the row-titles.
		rowText: 'Times New Roman', // The font for the row-under-text.
		objectTitle: 'Times New Roman', // The font for the object-titles.
		objectText: 'Times New Roman', // The font for the object-under-text.
		addonTitle: 'Times New Roman', // The font for the object-titles.
		addonText: 'Times New Roman', // The font for the object-under-text.
		scoreText: 'Times New Roman',

		// Size for the text.
		rowTitleTextSize: 200,
		rowTextTextSize: 100,
		objectTitleTextSize: 200,
		objectTextTextSize: 100,
		addonTitleTextSize: 200,
		addonTextTextSize: 100,
		scoreTextSize: 75,

		barTextColor: '#000000',
		barBackgroundColor: '#FFFFFFFF',
		barTextPadding: 17,
		barTextMargin: 0,
		barTextFont: 'Times New Roman',
		barTextSize: 15,
		barPadding: 0,
		barMargin: 0,

		// Colors for the text.
		rowTitleColor: '000000',
		rowTextColor: '000000',
		objectTitleColor: '000000',
		objectTextColor: '000000',
		addonTitleColor: '000000',
		addonTextColor: '000000',
		scoreTextColor: '000000',
		objectHeight: true,

		rowTitleAlign: 'center',
		rowTextAlign: 'center',
		objectTitleAlign: 'center',
		objectTextAlign: 'center',
		addonTitleAlign: 'center',
		addonTextAlign: 'center',
		scoreTextAlign: 'center',

		rowButtonXPadding: 0,
		rowButtonYPadding: 0,

		// Background image and color.
		backgroundImage: '',
		rowBackgroundImage: '',
		objectBackgroundImage: '',
		rowBorderImage: '',
		rowBorderImageRepeat: 'stretch',
		rowBorderImageWidth: 5,
		rowBorderImageSliceTop: 5,
		rowBorderImageSliceBottom: 5,
		rowBorderImageSliceLeft: 5,
		rowBorderImageSliceRight: 5,
		objectBorderImage: '',
		objectBorderImageRepeat: 'stretch',
		objectBorderImageWidth: 5,
		objectBorderImageSliceTop: 5,
		objectBorderImageSliceBottom: 5,
		objectBorderImageSliceLeft: 5,
		objectBorderImageSliceRight: 5,
		backgroundColor: '#FFFFFFFF',
		objectBgColor: '#FFFFFFFF',
		rowBgColor: '#FFFFFFFF',

		// Boolean that says if the row or object-color will be viewed.
		rowBgColorIsOn: false,
		objectBgColorIsOn: false,

		// Image radius and width
		objectImageWidth: 100,
		rowImageWidth: 100,
		objectImageMarginTop: 0,
		objectImageMarginBottom: 0,
		rowImageMarginTop: 0,

		// Margin and padding
		objectMargin: 10,
		rowMargin: 10,
		rowTextPaddingY: 5,
		rowTextPaddingX: 10,
		objectTextPadding: 10,

		rowBodyMarginTop: 25,
		rowBodyMarginBottom: 25,
		rowBodyMarginSides: 1,

		// Style Drop Shadow Object
		objectDropShadowH: 0,
		objectDropShadowV: 0,
		objectDropShadowSpread: 0,
		objectDropShadowBlur: 0,
		objectDropShadowColor: 'grey',
		objectDropShadowIsOn: false,

		// Style Drop Shadow Row
		rowDropShadowH: 0,
		rowDropShadowV: 0,
		rowDropShadowSpread: 0,
		rowDropShadowBlur: 0,
		rowDropShadowColor: 'grey',
		rowDropShadowIsOn: false,

		// Selected Filter
		selFilterBlurIsOn: false,
		selFilterBlur: 0,
		selFilterBrightIsOn: false,
		selFilterBright: 100,
		selFilterContIsOn: false,
		selFilterCont: 100,
		selFilterGrayIsOn: false,
		selFilterGray: 0,
		selFilterHueIsOn: false,
		selFilterHue: 0,
		selFilterInvertIsOn: false,
		selFilterInvert: 0,
		selFilterOpacIsOn: false,
		selFilterOpac: 100,
		selFilterSaturIsOn: false,
		selFilterSatur: 1,
		selFilterSepiaIsOn: false,
		selFilterSepia: 0,
		selBgColorIsOn: true,
		selFilterBgColor: '#70FF7EFF',

		// Required Filter
		reqFilterBlurIsOn: false,
		reqFilterBlur: 0,
		reqFilterBrightIsOn: false,
		reqFilterBright: 100,
		reqFilterContIsOn: false,
		reqFilterCont: 100,
		reqFilterGrayIsOn: false,
		reqFilterGray: 0,
		reqFilterHueIsOn: false,
		reqFilterHue: 0,
		reqFilterInvertIsOn: false,
		reqFilterInvert: 0,
		reqFilterOpacIsOn: true,
		reqFilterOpac: 50,
		reqFilterSaturIsOn: false,
		reqFilterSatur: 1,
		reqFilterSepiaIsOn: false,
		reqFilterSepia: 0,
		reqBgColorIsOn: false,
		reqFilterBgColor: '#FFFFFFFF',
		reqFilterVisibleIsOn: false,

		// Border radius row, and border
		rowBorderRadiusTopLeft: 0,
		rowBorderRadiusTopRight: 0,
		rowBorderRadiusBottomRight: 0,
		rowBorderRadiusBottomLeft: 0,
		rowBorderRadiusIsPixels: true,
		rowOverflowIsOn: true,

		rowBorderIsOn: false,
		rowBorderColor: 'red',
		rowBorderStyle: 'solid',
		rowBorderWidth: 2,

		// Border radius object, and border
		objectBorderRadiusTopLeft: 0,
		objectBorderRadiusTopRight: 0,
		objectBorderRadiusBottomRight: 0,
		objectBorderRadiusBottomLeft: 0,
		objectBorderRadiusIsPixels: true,
		objectOverflowIsOn: true,

		objectBorderIsOn: false,
		objectBorderColor: 'red',
		objectBorderStyle: 'solid',
		objectBorderWidth: 2,

		// Border radius object image, and border
		objectImgBorderRadiusTopLeft: 0,
		objectImgBorderRadiusTopRight: 0,
		objectImgBorderRadiusBottomRight: 0,
		objectImgBorderRadiusBottomLeft: 0,
		objectImgBorderRadiusIsPixels: true,

		objectImgBorderIsOn: false,
		objectImgBorderColor: 'red',
		objectImgBorderStyle: 'solid',
		objectImgBorderWidth: 2,

		// Border radius row image, and border
		rowImgBorderRadiusTopLeft: 0,
		rowImgBorderRadiusTopRight: 0,
		rowImgBorderRadiusBottomRight: 0,
		rowImgBorderRadiusBottomLeft: 0,
		rowImgBorderRadiusIsPixels: true,

		rowImgBorderIsOn: false,
		rowImgBorderColor: 'red',
		rowImgBorderStyle: 'solid',
		rowImgBorderWidth: 2,

		backPackWidth: 1200
	}
} satisfies App);
export const appMetaState = $state<{
	currentDesignComponent:
		| 'none'
		| 'appFilter'
		| 'appBackground'
		| 'appBackpack'
		| 'appMultiChoice'
		| 'appObjectDesign'
		| 'appObjectImage'
		| 'appPointBar'
		| 'appRowDesign'
		| 'appRowImage'
		| 'appText';
	imagePrefix: string;
	objectWidths: Array<{ name: string; value: string }>;
}>({
	currentDesignComponent: 'none',
	imagePrefix: '',
	objectWidths: [
		{ name: 'Row', value: '' },
		{ name: '1 per row', value: 'col-12' },
		{ name: '11/12', value: 'col-sm-11' },
		{ name: '10/12', value: 'col-sm-10' },
		{ name: '9/12', value: 'col-sm-9' },
		{ name: '8/12', value: 'col-sm-8' },
		{ name: '7/12', value: 'col-sm-7' },
		{ name: '2 per row', value: 'col-sm-6' }, // w-50
		{ name: '5/12', value: 'col-sm-5' }, // w-50
		{ name: '3 per Row', value: 'col-md-4' }, // w33
		{ name: '4 per Row', value: 'col-md-3' }, // w-25
		{ name: '5 per Row', value: 'w-20' },
		{ name: '6 per Row', value: 'col-lg-2' }, // w-6
		{ name: '7 per Row ', value: 'w-14' },
		{ name: '8 per Row ', value: 'w-12' },
		{ name: '9 per Row ', value: 'w-11' }, //w-11
		{ name: '10 per Row', value: 'w-10' },
		{ name: '11 per Row ', value: 'w-9' },
		{ name: '12 per Row', value: 'col-xl-1' } //w-8
	]
});
