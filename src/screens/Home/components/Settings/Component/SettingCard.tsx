import React from 'react';
import { Box, useColorMode, View } from 'native-base';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Text from 'src/components/KeeperText';
import { StyleSheet } from 'react-native';
import { hp, windowWidth, wp } from 'src/constants/responsive';
import CircleIconWrapper from 'src/components/CircleIconWrapper';
import usePlan from 'src/hooks/usePlan';
import { SubscriptionTier } from 'src/models/enums/SubscriptionTier';
import RightArrowIcon from 'src/assets/images/icon_arrow.svg';
import WhiteRightArrowIcon from 'src/assets/images/whiteRightIcon.svg';
import Colors from 'src/theme/Colors';

interface SettingCardItemProps {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  isDiamond?: boolean;
  showDot?: boolean;
  onPress?: () => void;
  onRightPress?: () => void;
}

interface SettingCardProps {
  backgroundColor?: string;
  borderColor?: any;
  header?: string;
  titleColor?: string;
  subtitleColor?: string;
  items: SettingCardItemProps[];
}

const SettingCard: React.FC<SettingCardProps> = ({
  backgroundColor = 'transparent',
  borderColor,
  titleColor,
  subtitleColor,
  header,
  items,
}) => {
  const { colorMode } = useColorMode();
  const isDarkMode = colorMode === 'dark';
  const { plan } = usePlan();
  const isDiamondHands = plan === SubscriptionTier.L3.toUpperCase();

  return (
    <>
      {header && (
        <Box>
          <Text
            color={isDarkMode ? `${colorMode}.headerWhite` : `${colorMode}.brownColor`}
            fontSize={14}
            semiBold
            style={styles.header}
          >
            {header}
          </Text>
        </Box>
      )}
      <Box
        style={styles.Wrapper}
        borderWidth={1}
        backgroundColor={backgroundColor}
        borderColor={borderColor}
      >
        {items.map((item, index) => {
          const applyDiamondCheck = item.isDiamond ? isDiamondHands : true;

          return (
            <React.Fragment key={index}>
              <TouchableOpacity
                onPress={applyDiamondCheck ? item.onPress : null}
                disabled={!applyDiamondCheck}
              >
                <Box style={styles.Container}>
                  <Box style={styles.document}>
                    <Box style={styles.icon}>
                      {item.showDot ? <Box style={styles.redDot} /> : null}
                      <CircleIconWrapper
                        width={wp(25)}
                        icon={item.icon}
                        backgroundColor={
                          applyDiamondCheck
                            ? `${colorMode}.pantoneGreen`
                            : `${colorMode}.disabledDiamond`
                        }
                      />
                    </Box>
                    <Box style={styles.textContainer}>
                      <Text
                        color={applyDiamondCheck ? titleColor : `${colorMode}.disabledDiamond`}
                        fontSize={14}
                        medium
                        style={styles.title}
                      >
                        {item.title}
                      </Text>
                      {item.description && (
                        <Text
                          style={styles.content}
                          fontSize={12}
                          numberOfLines={2}
                          color={applyDiamondCheck ? subtitleColor : `${colorMode}.disabledDiamond`}
                        >
                          {item.description}
                        </Text>
                      )}
                    </Box>
                  </Box>
                  <Box style={styles.rightIcon}>
                    {item.rightIcon ? (
                      <TouchableOpacity onPress={item.onRightPress}>
                        <Box>
                          {item.isDiamond && isDiamondHands ? (
                            isDarkMode ? (
                              <WhiteRightArrowIcon />
                            ) : (
                              <RightArrowIcon />
                            )
                          ) : (
                            item.rightIcon
                          )}
                        </Box>
                      </TouchableOpacity>
                    ) : (
                      <Box>{isDarkMode ? <WhiteRightArrowIcon /> : <RightArrowIcon />}</Box>
                    )}
                  </Box>
                </Box>
              </TouchableOpacity>
              {index < items.length - 1 && (
                <View
                  style={{
                    height: 1,
                    backgroundColor: isDarkMode ? 'transparent' : Colors.horizontaldivider,
                    marginVertical: 20,
                  }}
                />
              )}
            </React.Fragment>
          );
        })}
      </Box>
    </>
  );
};

export default SettingCard;

const styles = StyleSheet.create({
  Wrapper: {
    width: windowWidth * 0.89,
    marginBottom: wp(18),
    borderRadius: 15,
    padding: wp(21),
  },
  header: {
    marginTop: hp(10),
    marginBottom: hp(20),
  },
  Container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  content: {
    flexWrap: 'wrap',
    fontSize: 12,
    marginTop: 4,
  },
  document: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    flex: 1,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    marginBottom: 1,
  },
  icon: {
    marginTop: hp(10),
    marginRight: wp(6),
  },
  rightIcon: {
    width: 40,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  redDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'red',
    position: 'absolute',
    top: 0,
    right: 0,
    borderWidth: 1,
    zIndex: 1,
    borderColor: 'white',
  },
});
