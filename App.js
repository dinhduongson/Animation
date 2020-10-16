import { NavigationContainer } from '@react-navigation/native';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';
import ListIdol from './ListIdol'
import DetailScreen from './DetailScreen'
import React, { useState } from 'react';

const Stack = createSharedElementStackNavigator();

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="ListIdol"
            >
                <Stack.Screen name="ListIdol" component={ListIdol} />
                <Stack.Screen
                    name="DetailScreen"
                    component={DetailScreen}
                    options={() => ({
                        // gestureEnabled: false,
                        headerTitle: null,
                        transitionSpec: {
                            open: { animation: 'timing', config: { duration: 400 } },
                            close: { animation: 'timing', config: { duration: 400 } },
                        },
                        cardStyleInterpolator: ({ current: { progress } }) => {
                            return {
                                cardStyle: {
                                    opacity: progress
                                }
                            }
                        }
                    })}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};
export default App