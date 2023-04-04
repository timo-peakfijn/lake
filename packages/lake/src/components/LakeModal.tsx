import { ReactNode, Suspense, useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { commonStyles } from "../constants/commonStyles";
import {
  ColorVariants,
  backgroundColor,
  breakpoints,
  colors,
  negativeSpacings,
  shadows,
  spacings,
} from "../constants/design";
import { useBodyClassName } from "../hooks/useBodyClassName";
import { FocusTrap } from "./FocusTrap";
import { Icon, IconName } from "./Icon";
import { LakeButton } from "./LakeButton";
import { LakeHeading } from "./LakeHeading";
import { LoadingView } from "./LoadingView";
import { Portal } from "./Portal";
import { Pressable } from "./Pressable";
import { Context, ResponsiveContainer } from "./ResponsiveContainer";
import { Space } from "./Space";
import { TransitionView } from "./TransitionView";

export type LakeModalProps = {
  visible: boolean;
  title?: string;
  icon?: IconName;
  color?: ColorVariants;
  children: ReactNode | ((context: Context) => ReactNode);
  maxWidth?: number;
  onPressClose?: () => void;
};

const BACKGROUND_COLOR = "rgba(0, 0, 0, 0.6)";

const styles = StyleSheet.create({
  root: {
    ...StyleSheet.absoluteFillObject,
  },
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  inert: {
    pointerEvents: "none",
  },
  fill: {
    ...StyleSheet.absoluteFillObject,
    animationFillMode: "forwards",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: BACKGROUND_COLOR,
  },
  overlayEnter: {
    animationKeyframes: {
      "0%": { opacity: 0 },
    },
    animationDuration: "200ms",
    animationTimingFunction: "ease-in-out",
  },
  overlayLeave: {
    animationKeyframes: {
      "100%": { opacity: 0 },
    },
    animationDuration: "200ms",
    animationTimingFunction: "ease-in-out",
  },
  modalEnter: {
    animationKeyframes: {
      "0%": {
        opacity: 0,
        transform: "translateY(-20px)",
      },
    },
    animationDuration: "300ms",
    animationTimingFunction: "ease-in-out",
  },
  modalLeave: {
    animationKeyframes: {
      "100%": {
        opacity: 0,
        transform: "translateY(-20px)",
      },
    },
    animationDuration: "300ms",
    animationTimingFunction: "ease-in-out",
  },
  modalContainer: {
    ...StyleSheet.absoluteFillObject,
  },
  modalContentContainer: {
    padding: spacings[24],
    justifyContent: "center",
    flexGrow: 1,
  },
  modalContentContainerSmall: {
    padding: spacings[8],
    flexGrow: 1,
    justifyContent: "center",
  },
  modal: {
    backgroundColor: backgroundColor.default,
    borderRadius: 24,
    padding: spacings[48],
    boxShadow: shadows.modal,
    alignSelf: "stretch",
    width: "100%",
    marginHorizontal: "auto",
  },
  modalSmall: {
    borderRadius: 16,
    backgroundColor: backgroundColor.default,
    width: "100%",
    padding: spacings[24],
    alignSelf: "stretch",
    marginHorizontal: "auto",
  },
  modalHeader: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  modalIconTitle: {
    ...commonStyles.fill,
  },
  trap: {
    ...commonStyles.fill,
  },
  pressableOverlay: {
    ...StyleSheet.absoluteFillObject,
  },
  closeButton: {
    top: negativeSpacings[16],
    right: negativeSpacings[16],
  },
});

export const LakeModal = ({
  visible,
  icon,
  title,
  color = "current",
  children,
  maxWidth = 570,

  onPressClose,
}: LakeModalProps) => {
  const [rootElement, setRootElement] = useState<Element | undefined>(() => undefined);

  useEffect(() => {
    const rootElement = document.createElement("div");
    document.body.append(rootElement);
    setRootElement(rootElement);
    return () => {
      rootElement.remove();
      setRootElement(undefined);
    };
  }, []);

  useBodyClassName("ModalOpen", { enabled: visible });

  if (rootElement == null) {
    return null;
  }

  return (
    <Portal container={rootElement}>
      <View aria-modal={true} style={[styles.container, !visible && styles.inert]}>
        <TransitionView style={styles.fill} enter={styles.overlayEnter} leave={styles.overlayLeave}>
          {visible ? <View style={styles.overlay} /> : null}
        </TransitionView>

        <Suspense fallback={<LoadingView color={backgroundColor.accented} delay={0} />}>
          <TransitionView style={styles.fill} enter={styles.modalEnter} leave={styles.modalLeave}>
            {visible ? (
              <ResponsiveContainer style={styles.root} breakpoint={breakpoints.tiny}>
                {({ large, small }) => (
                  <FocusTrap
                    autoFocus={true}
                    focusLock={true}
                    returnFocus={true}
                    onEscapeKey={onPressClose}
                    style={styles.trap}
                  >
                    <ScrollView
                      style={styles.modalContainer}
                      contentContainerStyle={
                        large ? styles.modalContentContainer : styles.modalContentContainerSmall
                      }
                    >
                      {onPressClose != null ? (
                        <Pressable onPress={onPressClose} style={styles.pressableOverlay} />
                      ) : null}

                      <View style={[large ? styles.modal : styles.modalSmall, { maxWidth }]}>
                        <View style={styles.modalHeader}>
                          <View style={styles.modalIconTitle}>
                            {icon != null ? (
                              <Icon name={icon} size={large ? 40 : 32} color={colors[color][500]} />
                            ) : null}

                            {icon != null && title != null ? <Space height={12} /> : null}

                            {title != null ? (
                              <>
                                <LakeHeading level={2} variant="h3">
                                  {title}
                                </LakeHeading>

                                <Space height={12} />
                              </>
                            ) : null}
                          </View>

                          {onPressClose != null ? (
                            <LakeButton
                              style={styles.closeButton}
                              mode="tertiary"
                              onPress={onPressClose}
                              icon="lake-close"
                            />
                          ) : null}
                        </View>

                        {typeof children == "function" ? children({ large, small }) : children}
                      </View>
                    </ScrollView>
                  </FocusTrap>
                )}
              </ResponsiveContainer>
            ) : null}
          </TransitionView>
        </Suspense>
      </View>
    </Portal>
  );
};
