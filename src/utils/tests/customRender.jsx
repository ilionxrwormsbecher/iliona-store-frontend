
import {render as rtlRender} from '@testing-library/react'
import {createStore} from 'redux'
import {Provider} from 'react-redux'

export function render(
    ui,
    injectedReducer,
    {
        initialState,
        store = createStore(injectedReducer, initialState),
        ...renderOptions
        } = {},
    ) {
        function Wrapper({children}) {
        return <Provider store={store}>{children}</Provider>
        }
        return {
        ...rtlRender(ui, {
            wrapper: Wrapper,
            ...renderOptions,
        }),
        store,
        }
    }
