import { Meta } from "@storybook/react";
import { Grid } from "@swan-io/lake/src/components/Grid";
import { LakeButton } from "@swan-io/lake/src/components/LakeButton";
import { ScrollView } from "@swan-io/lake/src/components/ScrollView";
import { Space } from "@swan-io/lake/src/components/Space";
import { colors } from "@swan-io/lake/src/constants/design";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Except } from "type-fest";
import { LakeModal, LakeModalProps } from "../src/components/LakeModal";
import { StoryBlock, StoryPart } from "./_StoriesComponents";

const styles = StyleSheet.create({
  block: {
    height: 200,
    backgroundColor: colors.gray[100],
    borderRadius: 5,
  },
  grid: {
    paddingBottom: 20,
  },
  button: {
    alignSelf: "flex-start",
  },
});

export default {
  title: "Layout/Modal",
  component: LakeModal,
} as Meta<typeof LakeModal>;

type ButtonModalProps = Except<LakeModalProps, "children" | "visible"> & {
  withCloseCross?: boolean;
};

const ButtonModal = ({ withCloseCross = false, ...props }: ButtonModalProps) => {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <LakeButton color="live" size="small" onPress={() => setVisible(true)} style={styles.button}>
        Open
      </LakeButton>

      <LakeModal
        {...props}
        visible={visible}
        onPressClose={withCloseCross ? () => setVisible(false) : undefined}
      >
        <Space height={8} />

        <ScrollView>
          <Grid horizontalSpace={4} verticalSpace={4} numColumns={4} style={styles.grid}>
            <View style={styles.block} />
            <View style={styles.block} />
            <View style={styles.block} />
            <View style={styles.block} />
          </Grid>
        </ScrollView>

        <LakeButton color="live" size="small" onPress={() => setVisible(false)}>
          Close
        </LakeButton>
      </LakeModal>
    </>
  );
};

export const All = () => {
  return (
    <StoryBlock
      title="Modal"
      description={[
        "This component creates a modal with enter and leave animation. ",
        'You can try it by clicking on "Open" button.',
      ]}
    >
      <StoryPart title="Default">
        <ButtonModal />
      </StoryPart>

      <StoryPart title="With title">
        <ButtonModal title="A title" />
      </StoryPart>

      <StoryPart title="With title and icon">
        <ButtonModal title="Title and icon" icon="add-circle-filled" color="live" />
      </StoryPart>

      <StoryPart title="Closable with click outside and top right cross">
        <ButtonModal
          title="Title and icon"
          icon="add-circle-filled"
          color="live"
          withCloseCross={true}
        />
      </StoryPart>
    </StoryBlock>
  );
};
