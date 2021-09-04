import cartReducer, { cartActions, TCartState } from './cartSlice'

describe('cart reducer', () => {
  const initialState: TCartState = {
    cartItems: {
      ids: [],
      quantities: {},
    },
    error: null,
    isDrawerOpen: false,
  }

  it('should handle initial state', () => {
    expect(cartReducer(undefined, { type: 'unknown' })).toEqual({
      cartItems: {
        ids: [],
        quantities: {},
      },
      error: null,
      isDrawerOpen: false,
    })
  })

  it('should handle add cart item', () => {
    const id1 = 'abc'
    const state1 = cartReducer(initialState, cartActions.addItem(id1))
    expect(state1.cartItems.ids).toEqual([id1])
    expect(id1 in state1.cartItems.quantities).toBeTruthy()
    expect(state1.cartItems.quantities[id1]).toEqual(1)

    const state2 = cartReducer(state1, cartActions.addItem(id1))
    expect(state2.cartItems.quantities[id1]).toEqual(2)
  })

  it('should handle remove cart item', () => {
    const id1 = 'abc'
    const state1 = cartReducer(initialState, cartActions.addItem(id1))

    const state2 = cartReducer(state1, cartActions.removeItem(id1))
    expect(state2.cartItems.ids.includes(id1)).toBeFalsy()
    expect(id1 in state2.cartItems.quantities).toBeFalsy()
  })

  it('should handle open drawer', () => {
    const state1 = cartReducer(initialState, cartActions.openDrawer())
    expect(state1.isDrawerOpen).toBeTruthy()
  })

  it('should handle close drawer', () => {
    const state1 = cartReducer(initialState, cartActions.openDrawer())
    expect(state1.isDrawerOpen).toBeTruthy()

    const state2 = cartReducer(state1, cartActions.closeDrawer())
    expect(state2.isDrawerOpen).toBeFalsy()
  })

  it('should handle toggle drawer', () => {
    const state1 = cartReducer(initialState, cartActions.toggleDrawer())
    expect(state1.isDrawerOpen).toBeTruthy()

    const state2 = cartReducer(state1, cartActions.closeDrawer())
    expect(state2.isDrawerOpen).toBeFalsy()
  })
})
