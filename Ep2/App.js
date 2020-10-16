import { NavigationContainer } from '@react-navigation/native';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';
import Home from './Home'
import Detail from './Detail'
import React, { useState } from 'react';

const Stack = createSharedElementStackNavigator();

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home" screenOptions={{ headerTitle: null }}
            >
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen
                    name="Detail"
                    component={Detail}
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