import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { LakeText } from "../src/components/LakeText";
import { Space } from "../src/components/Space";
import { colors } from "../src/constants/design";
import { StoryBlock, StoryPart } from "./_StoriesComponents";
export default {
    title: "Typography/Text",
    component: LakeText,
};
export const Variations = () => {
    return (_jsxs(StoryBlock, { title: "Text", children: [_jsxs(StoryPart, { title: "Variations", children: [_jsx(LakeText, { children: "Default: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl nec" }), _jsx(Space, { height: 16 }), _jsx(LakeText, { variant: "light", children: "Light: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl nec" }), _jsx(LakeText, { variant: "regular", children: "Regular: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl nec" }), _jsx(LakeText, { variant: "medium", children: "Medium: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl nec" }), _jsx(LakeText, { variant: "semibold", children: "Semibold: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl nec" }), _jsx(Space, { height: 16 }), _jsx(LakeText, { variant: "smallRegular", children: "SmallRegular: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl nec" }), _jsx(LakeText, { variant: "smallMedium", children: "SmallMedium: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl nec" }), _jsx(LakeText, { variant: "smallSemibold", children: "SmallSemibold: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl nec" })] }), _jsxs(StoryPart, { title: "Colors", children: [_jsx(LakeText, { color: colors.gray.primary, children: "gray: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl nec" }), _jsx(LakeText, { color: colors.live.primary, children: "live: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl nec" }), _jsx(LakeText, { color: colors.sandbox.primary, children: "sandbox: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl nec" }), _jsx(LakeText, { color: colors.positive.primary, children: "positive: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl nec" }), _jsx(LakeText, { color: colors.warning.primary, children: "warning: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl nec" }), _jsx(LakeText, { color: colors.negative.primary, children: "negative: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl nec" }), _jsx(LakeText, { color: colors.current.primary, children: "current: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl nec" }), _jsx(LakeText, { color: colors.partner.primary, children: "partner: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl nec" }), _jsx(LakeText, { color: colors.swan.primary, children: "swan: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl nec" }), _jsx(LakeText, { color: colors.shakespear.primary, children: "shakespear: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl nec" }), _jsx(LakeText, { color: colors.darkPink.primary, children: "darkPink: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl nec" }), _jsx(LakeText, { color: colors.sunglow.primary, children: "sunglow: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl nec" }), _jsx(LakeText, { color: colors.mediumSladeBlue.primary, children: "mediumSladeBlue: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl nec" })] })] }));
};
