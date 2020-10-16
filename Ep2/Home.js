/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react';
import {
	SafeAreaView,
	StyleSheet,
	ScrollView,
	View,
	Text,
	StatusBar,
	FlatList,
	ImageBackground,
	Dimensions,
	Animated,
	TouchableOpacity
} from 'react-native';
import { Directions, FlingGestureHandler, State } from 'react-native-gesture-handler';
import { SharedElement } from 'react-navigation-shared-element';

const { width, height } = Dimensions.get('screen')
const DOT_SIZE = 20

const data = [
	{
		id: 1,
		url: 'https://i.pinimg.com/originals/fa/8d/31/fa8d311c1e4f9200e6c286dc22397308.jpg',
		name: 'Luda',
		info: 'Cosmic Girls',
	},
	{
		id: 2,
		url: 'https://www.kpopnews.vn/uploadcontent/fileuploads/uploads/2020/08/01/yoona-inn.jpg',
		name: 'Yoona',
		info: `Girls' Generation`,
	},
	{
		id: 3,
		url: 'https://i.pinimg.com/564x/27/c0/9b/27c09b352124ca559f6850cbe1969dce.jpg',
		name: 'Seohyun',
		info: `Girls' Generation`,
	},
	{
		id: 4,
		url: 'https://scontent.fhan3-2.fna.fbcdn.net/v/t31.0-8/26233566_151934228790677_265036235039415226_o.jpg?_nc_cat=101&_nc_sid=8bfeb9&_nc_ohc=VBHiGRwZQVAAX_jUFl6&_nc_ht=scontent.fhan3-2.fna&oh=3ca8e9241a2a853956a8bf78befc74d5&oe=5FA57E6E',
		name: 'Irene',
		info: 'Red Velvet',
	},
	{
		id: 5,
		url: 'https://media.doanhnghiepvn.vn/Images/Uploaded/Share/2019/12/16/Bi-fan-cuong-Jisoo-BLACKPINK-tan-cong-chi-gai--anh-re-cua-nu-than-tuong-xoa-sach-dau-vet-tren-Instagram_2.jpg',
		name: 'Jisoo',
		info: 'Blackpink'
	},
]
const ITEM_WITDH = width * 0.7
const ITEM_HEIGHT = ITEM_WITDH * 1.7
const SPACING = 18
const VISIBLE_ITEMS = 3
const FUL_SIZE = ITEM_WITDH + SPACING

const Home = ({ navigation }) => {

	const scrollX = React.useRef(new Animated.Value(0)).current

	const Item = ({ item, index, scrollX }) => {
		const inputRange = [FUL_SIZE * (index - 1), FUL_SIZE * index, FUL_SIZE * (index + 1)]

		const translateX = scrollX.interpolate({
			inputRange,
			outputRange: [FUL_SIZE, 0, -FUL_SIZE]
		})
		const translateX2 = scrollX.interpolate({
			inputRange,
			outputRange: [FUL_SIZE * 1.5, 0, -FUL_SIZE * 1.5]
		})
		const scale = scrollX.interpolate(
			{
				inputRange,
				outputRange: [0, 1, 0]
			}
		)
		return (
			<TouchableOpacity style={{
				width: ITEM_WITDH,
				marginLeft: SPACING,
				// marginHorizontal: width / 6,
				// justifyContent: 'center',
				// alignItems: 'center',
			}}
				activeOpacity={0.9}
				onPress={() => navigation.navigate('Detail', { item })}>
				<SharedElement id={`item.${item.id}.photo`}>
					<Animated.Image
						source={{ uri: item.url }}
						style={{
							width: ITEM_WITDH, height: ITEM_HEIGHT, borderRadius: 18, position: 'absolute'
						}}
					/>
				</SharedElement>
				<SharedElement id={`item.${item.id}.title`}>
					<Animated.Text style={{
						top: 20, fontWeight: '700', fontSize: 28,
						position: 'absolute', color: '#fff',
						left: 20,
						transform: [{ translateX }]
					}}>{item.name}</Animated.Text>
				</SharedElement>
				<SharedElement id={`item.${item.id}.subTitle`}>
					<Animated.Text style={{
						marginTop: 5, fontSize: 18, color: '#fff',
						left: 20,
						top: 54,
						position: 'absolute', fontWeight: '700',
						transform: [{ translateX: translateX2 }]
					}}>{item.info}</Animated.Text>
				</SharedElement>

			</TouchableOpacity>
		)
	}

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
			<Text style={{ marginLeft: 20, fontSize: 22, fontWeight: '700' }}>IDOLS</Text>
			<Animated.FlatList
				data={data}
				renderItem={({ item, index }) => (
					<Item index={index} item={item} scrollX={scrollX} />
				)}
				horizontal
				keyExtractor={(item, index) => String(index)}
				showsHorizontalScrollIndicator={false}
				contentContainerStyle={{ paddingTop: 20 }}
				snapToInterval={FUL_SIZE}
				decelerationRate="fast"
				onScroll={Animated.event(
					[{ nativeEvent: { contentOffset: { x: scrollX } } }],
					{ useNativeDriver: true }
				)}
			/>
		</SafeAreaView >

	);
};
const RADIUS = 1000000
const styles = StyleSheet.create({
	pagination: {
		position: 'absolute',
		// right: 60,
		// bottom: 150,
		flexDirection: 'row',
		height: DOT_SIZE
	},
	paginationDot: {
		width: DOT_SIZE * 0.3,
		height: DOT_SIZE * 0.3,
		borderRadius: DOT_SIZE * 0.15,
		backgroundColor: '#bbb'
	},
	paginationDotContainer: {
		width: DOT_SIZE,
		alignItems: 'center',
		justifyContent: 'center'
	},
	paginationIndicator: {
		width: DOT_SIZE,
		height: DOT_SIZE,
		borderRadius: DOT_SIZE / 2,
		borderWidth: 2,
		borderColor: '#ddd',
	}
})

export default Home;
