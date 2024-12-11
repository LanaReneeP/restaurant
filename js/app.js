class Store {
    constructor() {

        // track how many items are inthe cart and the subtotal of the items
        this.itemsInCart = {
            itemCount: 0,
            price: 0,
            subtotal: 0,
            subTimesQty: 0,
            tax: 0,
            deliveryFee: 6,
            total: 0
        }

        this.promos = {
            noDeliveryFee: 'nofee24',
            twentyPercentOff: '20percent'
        }

        this.menu = {

            item1: {
                id: 1,
                dish: 'manicotti',
                imgUrl: 'manicotti.jpg',
                alt: 'manicotti',
                desc: 'a large, tube-shaped pasta thats typically ridged and stuffed with cheese or meat, then baked and covered with tomato sauce',
                price: 9.99,
                qty: 0
            } , 
            item2: {
                id: 2,
                dish: 'Carbonara',
                imgUrl: 'carbonara.jpg',
                alt: 'Carbonara',
                desc: 'a Roman dish made with eggs, hard cheese, and cured pork',
                price: 9.99,
                qty: 0
            }, 
            item3: {
                id: 3,
                dish: 'Cacio e pepe',
                imgUrl: 'cep.jpg',
                alt: 'Cacio e pepe',
                desc: 'a simple, flavorful pasta dish from Rome, Italy thats made with cheese, pepper, and pasta',
                price: 9.99,
                qty: 0
            }, 
            item4: {
                id: 4,
                dish: 'Risotto',
                imgUrl: 'risotto.jpg',
                alt: 'Risotto',
                desc: 'an Italian dish of rice cooked in broth until its creamy and spoonable, and often finished with butter and cheese',
                price: 9.99,
                qty: 0
            },
            item5: {
                id: 5,
                dish: 'Lasagna',
                imgUrl: 'lasagna.jpg',
                alt: 'Lasagna',
                desc: 'A rich and creamy whole-wheat pasta dish filled layer by layer with refreshingly fresh onions and garlic, lathered in a succulent sauce and topped with imported, premium quality mozzarella',
                price: 9.99,
                qty: 0
            },
            item6: {
                id: 6,
                dish: 'Pizza Margherita',
                imgUrl: 'pm.jpg',
                alt: 'Pizza Marghertia',
                desc: 'a Neapolitan-style pizza thats typically round with a raised edge, and made with fresh mozzarella, tomatoes, basil, and olive oil',
                price: 9.99,
                qty: 0
            },
            item7: {
                id: 7,
                dish: 'Pasta e fagioli',
                imgUrl: 'pef.jpg',
                alt: 'Pasta e fagioli',
                desc: 'tiny pasta, creamy beans, and tender vegetables in a fragrant tomato broth',
                price: 9.99,
                qty: 0
            }, 
            item8: {
                id: 8,
                dish: 'Creamy Tuscan Chicken',
                imgUrl: 'ctc.jpg',
                alt: 'Creamy Tuscan Chicken',
                desc: 'chicken thighs or breasts that have been cooked through and nestled into a creamy Italian inspired sauce. The sauce normally includes, Italian spices, cream, parmesan cheese, sun-dried tomatoes, onions and spinach',
                price: 9.99,
                qty: 0
            }
        }
    }

    init() {
        // console.log('initialized')
        this.loadItems()
        this.addToCart()
        this.checkout()
        this.addPromo()
        this.homeSwitch()
        this.confirmOrder()
    }

    loadItems() {
        const itemDiv = document.getElementById('itemDiv')

        /**
         * for in loop
         * 
         * for in loop loops through properties of an object
         */
        for (const key in this.menu) {
            const item = this.menu[key]
            
            const product = document.createElement('div')
            product.className = 'col'
            product.setAttribute('id', `item-${item.id}`)
            
            product.innerHTML = `
            <figure class="figure item-figure">
                <img src="images/${item.imgUrl}" alt="${item.alt}" class="img-fluid image item-image figure-img w-100 rounded" />
                <figcaption class="figure-caption item-caption text-capitalize">${item.dish}
                    <span class="item-price" id="itemPrice">${item.price}</span>
                </figcaption>
                <p class="item-desc" id="itemDesc">${item.desc}</p>
                <button class="btn menu-btn text-capitalize" id="menuBtn" data-id="${item.id}">add to cart</button>
            </figure>
            `
            itemDiv.appendChild(product)
        }
    }

    getTotals(obj, rate) {
        this.itemsInCart = {
            itemCount: this.itemsInCart.itemCount + 1,
            price: this.itemsInCart.price+=obj.price,
            subtotal: this.itemsInCart.price,
            subTimesQty: (obj.price * obj.qty).toFixed(2),
            tax: this.itemsInCart.subtotal * rate,
            deliveryFee: this.itemsInCart.deliveryFee,
            total: (this.itemsInCart.subtotal + this.itemsInCart.tax + this.itemsInCart.deliveryFee).toFixed(2)
        }

        console.log(this.itemsInCart)
        return this.itemsInCart
    }

    addToCart() {
        const menuButtons = document.querySelectorAll('.menu-btn')
        const cartItems = document.getElementById('cartItems')
        const cartSubtotal = document.getElementById('cartSubtotal')
        const subtotalValue = document.getElementById('subtotalValue')
        const taxValue = document.getElementById('taxValue')
        const deliveryValue = document.getElementById('deliveryValue')
        const checkoutItemCount = document.getElementById('checkoutItemCount')
    
        let taxRate = .07
        const totalValue = document.getElementById('totalValue')

        // loop through this.menu 
        for (const key in this.menu) {
            const item = this.menu[key]

            // loop through buttons
            menuButtons.forEach(button => {
                button.addEventListener('click', ()=> {
                    if (button.dataset['id'] == item.id) {
                        
                        item.qty++
                        // testing
                        this.getTotals(item, taxRate)
                        //  end testing...SUCCESS!!

                        // this.itemsInCart.itemCount++
                        // this.itemsInCart.price+= item.price
                        // this.itemsInCart.subtotal = this.itemsInCart.price


                        // this.itemsInCart.subTimesQty = (item.price * item.qty).toFixed(2)
                        // this.itemsInCart.tax = this.itemsInCart.subtotal * taxRate
                        // this.itemsInCart.total = (this.itemsInCart.subtotal + this.itemsInCart.tax + this.itemsInCart.deliveryFee).toFixed(2)

                    }

                    // send to DOM
                    cartItems.innerText = this.itemsInCart.itemCount
                    cartSubtotal.innerText = this.itemsInCart.price.toFixed(2)
                    subtotalValue.innerText = this.itemsInCart.subtotal.toFixed(2)
                    deliveryValue.innerText = this.itemsInCart.deliveryFee.toFixed(2)
                    taxValue.innerText = this.itemsInCart.tax.toFixed(2)
                    totalValue.innerText = this.itemsInCart.total

                    // if (this.itemsInCart.itemCount == 1) {
                    //     checkoutItemCount.innerText = `${this.itemsInCart.itemCount} item`
                    // } else {
                    //     checkoutItemCount.innerText = `${this.itemsInCart.itemCount} items`
                    // }

                    checkoutItemCount.innerText = this.itemsInCart.itemCount == 1 ? `${this.itemsInCart.itemCount} item` : `${this.itemsInCart.itemCount} items`

                })
            })
        }
    }

    checkout() {
        const cartBtn = document.getElementById('cartBtn')
        const checkoutPage = document.getElementById('checkoutPage')
        const menuSection = document.getElementById('menuSection')
        const tableBody = document.getElementById('tbody')

        let subTimesQty = 0

        cartBtn.addEventListener('click', ()=> {
            // console.log('click')
            if (menuSection.classList.contains('d-none')) return 

            checkoutPage.classList.remove('d-none')
            menuSection.classList.add('d-none')

            for (const key in this.menu) {
                const item = this.menu[key]

                if (item.qty > 0) {
                    subTimesQty = (item.qty * item.price).toFixed(2)

                    const tableRow = document.createElement('tr')
                    tableRow.className = 'item-checkout'

                    tableRow.innerHTML+= `
                        <td id="itemImg">
                            <img src="images/${item.imgUrl}" alt="${item.alt}" class="img-fluid item-img" />
                        </td>
                        <td class="unit-price">${item.price.toFixed(2)}</td>
                        <td class="item-quantity">${item.qty}</td>
                        <td class="item-subtotal">${subTimesQty}</td>
                    `

                    tableBody.appendChild(tableRow)
                }
            }
        })
    }

    homeSwitch() {
        const homeSwitch = document.querySelector('.home-switch')
        const checkoutPage = document.getElementById('checkoutPage')
        const menuSection = document.getElementById('menuSection')

        homeSwitch.style.cursor = 'pointer'

        homeSwitch.addEventListener('click', ()=> {
            // console.log('clicked')
            menuSection.classList.remove('d-none')
            checkoutPage.classList.add('d-none')


            const tableBody = document.getElementById('tbody')
            tableBody.innerHTML = ''
        })
    }

    confirmOrder() {
        const confirmBtn = document.getElementById('confirmBtn')
        const tableBody = document.getElementById('tbody')
        const cartItems = document.getElementById('cartItems')
        const cartSubtotal = document.getElementById('cartSubtotal')
        const subtotalValue = document.getElementById('subtotalValue')
        const taxValue = document.getElementById('taxValue')
        const totalValue = document.getElementById('totalValue')

        confirmBtn.addEventListener('click', ()=> {
            // this.itemsInCart.itemCount = 0
            // this.itemsInCart.subtotal = 0
            for (const key in this.itemsInCart) {
                if (key != 'deliveryFee') {
                    this.itemsInCart[key] = 0
                }
            }
            console.log(this.itemsInCart)



            tableBody.innerHTML = '<h2>Your order is confirmed</h2>'

            cartItems.innerText = this.itemsInCart.itemCount
            cartSubtotal.innerText = this.itemsInCart.subtotal.toFixed(2)
            subtotalValue.innerText = 0
            taxValue.innerText = 0
            totalValue.innerText = 0

            for (const key in this.menu) {
                const item = this.menu[key]

                item.qty = 0
            }
        })
    }

    addPromo() {
        const promoBtn = document.getElementById('promoBtn')
        // get deliveryFee
        let { deliveryFee } = this.itemsInCart
        let { subtotal } = this.itemsInCart

        const { noDeliveryFee } = this.promos
        const { twentyPercentOff }  = this.promos

        promoBtn.addEventListener('click', (e)=> {
            e.preventDefault()
            const promo = document.getElementById('promo').value.toLowerCase()

            if (noDeliveryFee == promo) {
                deliveryFee = 0
            } else if (twentyPercentOff == promo) {
                subtotal = subtotal * .20
            }

            console.log(this.itemsInCart)



        })
    }
}

const restaurant = new Store()

restaurant.init()


