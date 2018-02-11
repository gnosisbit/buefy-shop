import Vuex from 'vuex'
import Helpers from 'mwangaben-vthelpers'
import { shallow, createLocalVue } from 'vue-test-utils'
import fakeStore from '@/__tests__/__mocks__/fakeStore'
import CartBox from '@/components/CartBox'

jest.mock('@/plugins/firebase', () => jest.fn())

const localVue = createLocalVue()
localVue.use(Vuex)

let wrapper, b, store

describe('CartBox', () => {
  beforeEach(() => {
    store = new Vuex.Store(fakeStore)
    wrapper = shallow(CartBox, {
      localVue,
      store,
      propsData: {
        item: {
          ...fakeStore.modules.product.state.products[0]
        },
        index: 0
      }
    })
    b = new Helpers(wrapper, expect)
  })

  it('is a Vue instance', () => {
    expect(wrapper.exists()).toBeTruthy()
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  it('have a btn remove', () => {
    const firstBoxRemoveItemBtn = '.box .removeItem'
    b.domHas(firstBoxRemoveItemBtn)
  })
})
