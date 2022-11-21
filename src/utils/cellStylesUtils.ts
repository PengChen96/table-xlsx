
export const getStyles = ({
  fontName = 'Calibri',
  fontColorRgb = '333333',
  fontBold = false,
  fillFgColorRgb = 'ffffff',
  borderStyle = 'thin',
  borderColorRgb = 'd1d3d8',
  alignmentHorizontal = 'center', // left center right
  alignmentVertical = 'center', // top center bottom
  alignmentWrapText = false, // true false
  alignmentReadingOrder = 2, // for right-to-left
  alignmentTextRotation = 0, // Number from 0 to 180 or 255
} : {
  fontBold?: boolean,
  fontName?: string,
  fontColorRgb?: string,
  fillFgColorRgb?: string,
  borderStyle?: string,
  borderColorRgb?: string,
  alignmentHorizontal?: string,
  alignmentVertical?: string,
  alignmentWrapText?: boolean,
  alignmentReadingOrder?: number,
  alignmentTextRotation?: number,
}) => {
  return {
    fill: {
      fgColor: { rgb: formatRgb(fillFgColorRgb) }
    },
    font: {
      name: fontName,
      color: { rgb: formatRgb(fontColorRgb) },
      bold: fontBold,
    },
    border: getDefaultBorder({style: borderStyle, colorRgb: formatRgb(borderColorRgb)}),
    numFmt: undefined,
    alignment: {
      horizontal: alignmentHorizontal,
      vertical: alignmentVertical,
      wrapText: alignmentWrapText,
      readingOrder: alignmentReadingOrder,
      textRotation: alignmentTextRotation,
    },
  };
};

const getDefaultBorder = (
  {
    style = 'thin',
    colorRgb = 'd1d3d8',
  } : {
    style?: string,
    colorRgb?: string
  }
) => {
  const border =  {
    top: {
      style, // thin medium thick dotted hair dashed mediumDashed dashDot mediumDashDot dashDotDot mediumDashDotDot slantDashDot
      color: {
        rgb: colorRgb, // ARGB
        // auto: 1,
        // theme: '1',
        // tint: '-0.25',
        // index: 64
      }
    },
    left: {
      style: style,
      color: { rgb: colorRgb }
    },
    bottom: {
      style: style,
      color: { rgb: colorRgb }
    },
    right: {
      style: style,
      color: { rgb: colorRgb }
    },
    diagonal: {
      style: style,
      color: { rgb: colorRgb }
    }
  };
  return border;
};

const formatRgb = (hex:string) => {
  return hex.replace('#', '');
};
