
export const getStyles = ({
  fontName = 'Calibri',
  fontColorRgb = '333333',
  fontBold = false,
  fillFgColorRgb = 'ffffff',
  borderStyle = 'thin',
  borderColorRgb = 'd1d3d8',
  alignmentHorizontal = 'center', // left center right
  alignmentVertical = 'center', // top center bottom
} : {
  fontBold?: boolean,
  fontName?: string,
  fontColorRgb?: string,
  fillFgColorRgb?: string,
  borderStyle?: string,
  borderColorRgb?: string,
  alignmentHorizontal?: string,
  alignmentVertical?: string,
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
