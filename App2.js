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
	Image,
	Dimensions,
	Animated
} from 'react-native';
import { Directions, FlingGestureHandler, State } from 'react-native-gesture-handler';
const { width } = Dimensions.get('screen')
const data = [
	{
		id: 1,
		url: 'https://i.pinimg.com/originals/fa/8d/31/fa8d311c1e4f9200e6c286dc22397308.jpg'
	},
	{
		id: 2,
		url: 'https://www.kpopnews.vn/uploadcontent/fileuploads/uploads/2020/08/01/yoona-inn.jpg'
	},
	{
		id: 3,
		url: 'https://i.pinimg.com/564x/27/c0/9b/27c09b352124ca559f6850cbe1969dce.jpg',
	},
	{
		id: 4,
		url: 'https://scontent.fhan3-2.fna.fbcdn.net/v/t31.0-8/26233566_151934228790677_265036235039415226_o.jpg?_nc_cat=101&_nc_sid=8bfeb9&_nc_ohc=VBHiGRwZQVAAX_jUFl6&_nc_ht=scontent.fhan3-2.fna&oh=3ca8e9241a2a853956a8bf78befc74d5&oe=5FA57E6E'
	}
]
const ITEM_WITDH = width * 0.76
const ITEM_HEIGHT = ITEM_WITDH * 1.7
const SPACING = 10
const VISIBLE_ITEMS = 3

const App = () => {

	const scrollXIndex = React.useRef(new Animated.Value(0)).current
	const scrollXAnimated = React.useRef(new Animated.Value(0)).current
	const [index, setIndex] = React.useState(0)
	const setActiveIndex = React.useCallback((index) => {
		setIndex(index)
		scrollXIndex.setValue(index)
	})

	React.useEffect(() => {
		Animated.spring(scrollXAnimated, {
			toValue: scrollXIndex,
			useNativeDriver: true
		}).start()
	})

	const renderItem = ({ item, index }) => {
		const inputRange = [index - 1, index, index + 1]
		const scale = scrollXAnimated.interpolate({
			inputRange,
			outputRange: [.85, 1, 1.3]
		})
		const opacity = scrollXAnimated.interpolate({
			inputRange,
			outputRange: [0.8, 1, 0]
		})
		const translateX = scrollXAnimated.interpolate({
			inputRange,
			outputRange: [50, 0, -100]
		})
		return (
			<Animated.View style={{
				position: 'absolute',
				left: -ITEM_WITDH / 2,
				transform: [{ scale }, { translateX }],
				opacity,
				zIndex: data.length - index
			}}>
				<Image
					source={{ uri: item.url }}
					style={{ width: ITEM_WITDH, height: ITEM_HEIGHT, borderRadius: 18 }}
				/>
			</Animated.View>
		)
	}

	return (
		<FlingGestureHandler
			key={'left'}
			direction={Directions.LEFT}
			onHandlerStateChange={ev => {
				if (ev.nativeEvent.state == State.END) {
					if (index === data.length - 1)
						return
					setActiveIndex(index + 1)
				}
			}}
		>
			<FlingGestureHandler
				key={'right'}
				direction={Directions.RIGHT}
				onHandlerStateChange={ev => {
					if (ev.nativeEvent.state == State.END) {
						if (index === 0)
							return
						setActiveIndex(index - 1)
					}
				}}
			>
				<SafeAreaView style={{ flex: 1 }}>
					<FlatList
						data={data}
						renderItem={renderItem}
						horizontal
						keyExtractor={(item, index) => String(index)}
						inverted
						CellRendererComponent={({ item, index, children, style, ...props }) => {
							const newStyle = [style, { zIndex: data.length - index }]
							return <View style={newStyle} index={index} {...props}>
								{children}
							</View>
						}}
						contentContainerStyle={{
							flex: 1,
							justifyContent: 'center',
							padding: SPACING * 2
						}}
						scrollEnabled={false}
						removeClippedSubviews={false}
					/>
				</SafeAreaView>
			</FlingGestureHandler>
		</FlingGestureHandler >
	);
};

const styles = StyleSheet.create({
})

export default App;
