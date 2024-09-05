import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import { Colors } from '../Theme/Colors';
import { Fonts } from '../Theme/Fonts';
import { StringConstants } from '../Theme/StringConstants';

interface JobsTabProps {
  leftTitle: string;
  middleTitle: string;
  rightTitle: string;
  selectedFilterTab: number;
  tapOnFilterTab: (val: number) => void;
  selectedTab: boolean;
  inJobMyJobCount?: any;
  newLoadsCount?: any;
  outJobMyJobCount?: any;
  unassignedJobCount?: any
}

const JobsTab: React.FC<JobsTabProps> = ({
  leftTitle,
  middleTitle,
  rightTitle,
  selectedFilterTab,
  tapOnFilterTab,
  selectedTab,
  inJobMyJobCount,
  newLoadsCount,
  outJobMyJobCount,
  unassignedJobCount

}) => {



  const getTabStyle = (tab: number, title: string) => {
    let backgroundColor

    if (title.includes("New Loads")) {
      backgroundColor = Colors.GREEN
    } else {
      backgroundColor = Colors.ORANGE
    }

    return selectedFilterTab === tab ? [styles.activeTab, { backgroundColor: backgroundColor }] : styles.tab;
  };

  const getTabTextStyle = (tab: number) => {
    return selectedFilterTab === tab ? styles.activeTabText : styles.tabText;
  };


  const renderTab = (key: number, title: string) => {
    return (
      <TouchableOpacity
        style={getTabStyle(key, title)}
        onPress={() => tapOnFilterTab(key)}
      >

        <Text style={getTabTextStyle(key)}>{title}</Text>

        {title == StringConstants.MY_JOBS &&
          <View style={selectedFilterTab === 0 ? styles.activeView : styles.inactiveView}>
            <Text style={selectedFilterTab === 0 ? styles.activeCountText : styles.countText}>
              {selectedTab === true ? inJobMyJobCount > 99 ? "99+" : inJobMyJobCount : outJobMyJobCount > 99 ? "99+" : outJobMyJobCount}
            </Text>
          </View>
        }
        {title == StringConstants.NEW_LOADS &&
          <View style={selectedFilterTab === 2 ? styles.activeView : styles.inactiveView}>
            <Text style={selectedFilterTab === 2 ? styles.activeNewLoadsCountText : styles.newLoadsCountText}>
              {newLoadsCount > 99 ? "99+" : newLoadsCount}
            </Text>
          </View>
        }
        {title == StringConstants.UNASSIGNED &&
          <View style={selectedFilterTab === 2 ? styles.activeView : styles.inactiveView}>
            <Text style={selectedFilterTab === 2 ? styles.activeCountText : styles.countText}>
              {unassignedJobCount > 99 ? "99+" : unassignedJobCount}
            </Text>
          </View>
        }

      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.mainTabView}>
      {renderTab(0, leftTitle)}
      {renderTab(1, middleTitle)}
      {renderTab(2, rightTitle)}
    </View>
  );
};

const styles = StyleSheet.create({
  mainTabView: {
    height: 35,
    width: '90%',
    flexDirection: 'row',
    borderRadius: 26,
    backgroundColor: Colors.COLOR_GREY3,
    alignSelf: 'center',
    marginTop: 30,

  },
  tab: {
    height: 35,
    width: '33.33%',
    borderRadius: 27,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.COLOR_GREY3,
    flexDirection: 'row'
  },
  activeTab: {
    height: 35,
    width: '33.33%',
    borderRadius: 27,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  tabText: {
    fontSize: 10,
    fontFamily: Fonts.DM_SANS_MEDIUM,
    color: Colors.PLACEHOLDER_TEXT,
  },
  activeTabText: {
    fontSize: 10,
    fontFamily: Fonts.DM_SANS_MEDIUM,
    color: Colors.WHITE,
  },
  countText: {
    fontSize: 10,
    fontFamily: Fonts.DM_SANS_MEDIUM,
    color: Colors.WHITE,

  },
  activeNewLoadsCountText: {
    fontSize: 10,
    fontFamily: Fonts.DM_SANS_MEDIUM,
    color: Colors.GREEN,

  },
  activeCountText: {
    fontSize: 10,
    fontFamily: Fonts.DM_SANS_MEDIUM,
    color: Colors.ORANGE,

  },
  newLoadsCountText: {
    fontSize: 10,
    fontFamily: Fonts.DM_SANS_MEDIUM,
    color: Colors.WHITE,

  },
  inactiveView: {
    backgroundColor: Colors.ORANGE,
    borderRadius: 20,
    marginLeft: 5,
    alignItems: 'center',
    justifyContent: 'center',
    height: 24,
    width: 24
  },
  activeView: {
    backgroundColor: Colors.WHITE,
    borderRadius: 20,
    marginLeft: 5,
    alignItems: 'center',
    justifyContent: 'center',
    height: 24,
    width: 24
  }

});

export default JobsTab;
