import Highlight, { Prism } from "prism-react-renderer";
import theme from "prism-react-renderer/themes/github";
import { memo, ReactNode, useMemo } from "react";
import { ScrollView, StyleProp, StyleSheet, Text, View, ViewStyle } from "react-native";
import { match, P } from "ts-pattern";
import { Box } from "../src/components/Box";
import { LakeText } from "../src/components/LakeText";
import { Separator } from "../src/components/Separator";
import { Space } from "../src/components/Space";
import { colors, radii, texts } from "../src/constants/design";

const styles = StyleSheet.create({
  storyTitle: {
    ...texts.h1,
  },
  partTitle: {
    ...texts.smallSemibold,
    textTransform: "uppercase",
  },
  codeBlock: {
    backgroundColor: colors.gray[0],
    borderRadius: radii[8],
    padding: 16,
  },
});

type StoryIntroductionProps = {
  title: string;
  description?: string | string[];
  children: ReactNode;
};

export const StoryBlock = ({ title, description, children }: StoryIntroductionProps) => {
  return (
    <ScrollView>
      <LakeText style={styles.storyTitle}>{title}</LakeText>
      <Space height={8} />

      {match(description)
        .with(P.string, description => <LakeText>{description}</LakeText>)
        .with(P.array(P.string), description =>
          description.map((description, index) => (
            <View key={index}>
              <LakeText>{description}</LakeText>
            </View>
          )),
        )
        .with(P.nullish, () => null)
        .exhaustive()}

      <Space height={32} />

      {children}
    </ScrollView>
  );
};

type StoryPartProps = {
  title: string;
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
};

export const StoryPart = ({ title, children, style }: StoryPartProps) => {
  return (
    <Box>
      <LakeText style={styles.partTitle}>{title}</LakeText>
      <Space height={24} />
      <View style={style}>{children}</View>
      <Space height={12} />
      <Separator />
      <Space height={24} />
    </Box>
  );
};

type StoryCodeBlockProps = {
  title: string;
  description?: string | string[];
  children: string;
};

export const StoryCodePart = ({ title, description, children }: StoryCodeBlockProps) => {
  const code = useMemo(() => {
    // remove first line if empty
    if (children.startsWith("\n")) {
      return children.slice(1);
    }
    return children;
  }, [children]);

  return (
    <Box>
      <LakeText style={styles.partTitle}>{title}</LakeText>
      <Space height={8} />

      {match(description)
        .with(P.string, description => <LakeText>{description}</LakeText>)
        .with(P.array(P.string), description =>
          description.map((description, index) => (
            <View key={index}>
              <LakeText>{description}</LakeText>
            </View>
          )),
        )
        .with(P.nullish, () => null)
        .exhaustive()}

      <TsCodeBlock>{code}</TsCodeBlock>
      <Space height={12} />
      <Separator />
      <Space height={24} />
    </Box>
  );
};

type TsCodeHighlightProps = {
  children: string;
};

const TsCodeBlock = memo<TsCodeHighlightProps>(({ children }) => {
  return (
    <Highlight Prism={Prism} theme={theme} code={children} language="tsx">
      {({ tokens, getLineProps, getTokenProps }) => (
        <View style={styles.codeBlock}>
          {tokens.map((line, i) => (
            <Text {...getLineProps({ line, key: i })}>
              {line.map((token, key) => (
                <Text {...getTokenProps({ token, key })} />
              ))}
            </Text>
          ))}
        </View>
      )}
    </Highlight>
  );
});
