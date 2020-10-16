import { SharedElement } from 'react-navigation-shared-element';
import { Image, Dimensions, View, Animated } from 'react-native'
import React, { useState } from 'react';

const { width, height } = Dimensions.get('screen')
const ITEM_HEIGHT = height
const ITEM_WITDH = ITEM_HEIGHT / 1.7

const Detail = props => {
    const { item } = props.route.params;
    return (
        <View style={{
        }}>
            <SharedElement id={`item.${item.id}.photo`}>
                <Image
                    source={{ uri: item.url }}
                    style={{
                        width: ITEM_WITDH, height: ITEM_HEIGHT,
                        alignSelf: 'center', position: 'absolute'
                        // transform: [{ scale }]
                    }}
                />
                <SharedElement id={`item.${item.id}.title`}>
                    <Animated.Text style={{
                        top: 25, fontWeight: '700', fontSize: 30,
                        position: 'absolute',
                        left: 20, color: 'white'
                        // opacity: textOpacity,
                        // transform: [{ scale: textScale }]
                    }}>{item.name}</Animated.Text>
                </SharedElement>
                <SharedElement id={`item.${item.id}.subTitle`}>
                    <Animated.Text style={{
                        marginTop: 5, fontSize: 18, color: '#fff',
                        top: 60,
                        left: 20,
                        position: 'absolute'
                        // opacity: textOpacity,
                        // transform: [{ scale: textScale }]
                    }}>{item.info}</Animated.Text>
                </SharedElement>
            </SharedElement>

        </View>
    );
};
Detail.sharedElements = (route, otherRoute, showing) => {
    const { item } = route.params;
    return [
        {
            id: `item.${item.id}.photo`
        },
        {
            id: `item.${item.id}.title`
        },
        {
            id: `item.${item.id}.subTitle`
        },
    ];
}
export default Detail