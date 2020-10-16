import { SharedElement } from 'react-navigation-shared-element';
import { Image, Dimensions, View, Animated } from 'react-native'
import React, { useState } from 'react';

const { width } = Dimensions.get('screen')

const ITEM_WITDH = width * 0.9
const ITEM_HEIGHT = ITEM_WITDH * 1.7

const DetailScreen = props => {
    const { item } = props.route.params;
    return (
        <View style={{
            alignItems: 'center'
        }}>
            <SharedElement id={`item.${item.id}.photo`}>
                <Image
                    source={{ uri: item.url }}
                    style={{
                        width: ITEM_WITDH, height: ITEM_HEIGHT, borderRadius: 18,
                        alignSelf: 'center'
                        // transform: [{ scale }]
                    }}
                />
            </SharedElement>
            <SharedElement id={`item.${item.id}.title`}>
                <Animated.Text style={{
                    marginTop: 25, fontWeight: '700', fontSize: 30,
                    // opacity: textOpacity,
                    // transform: [{ scale: textScale }]
                }}>{item.name}</Animated.Text>
            </SharedElement>
            <SharedElement id={`item.${item.id}.subTitle`}>
                <Animated.Text style={{
                    marginTop: 5, fontSize: 18, color: '#82858a',
                    // opacity: textOpacity,
                    // transform: [{ scale: textScale }]
                }}>{item.info}</Animated.Text>
            </SharedElement>
        </View>
    );
};
DetailScreen.sharedElements = (route, otherRoute, showing) => {
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
export default DetailScreen