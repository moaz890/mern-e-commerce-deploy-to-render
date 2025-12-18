export const registerFormControls = [
    {
        name: "username",
        label: "Username",
        type: "text",
        placeholder: "Username...",
        componentType: "input",
    },
    {
        name: "email",
        label: "Email",
        type: "email",
        placeholder: "folan@example.com",
        componentType: "input",
    },
    {
        name: "password",
        label: "Password",
        type: "password",
        placeholder: "Password",
        componentType: "input",
    },
]

export const loginFormControls = [
    {
        name: "email",
        label: "Email",
        type: "email",
        placeholder: "Enter your email",
        componentType: "input",
    },
    {
        name: "password",
        label: "Password",
        type: "password",
        placeholder: "Enter your password",
        componentType: "input",
    },
]

export const addProductFormElements = [
    {
        name: "title",
        label: "Title",
        type: "text",
        placeholder: "Enter product title",
        componentType: "input",
    },{
        name: "description",
        label: "Description",
        placeholder: "Enter product description",
        componentType: "textarea",
    },
    {
        name: "price",
        label: "Price",
        type: "number",
        placeholder: "Enter product price",
        componentType: "input",
    },
    {
        name: "category",
        label: "Category",
        componentType: "select",
        options: [
            {
                label: "Men",
                value: "men",
            },
            {
                label: "Women",
                value: "women",
            },
            {
                label: "Kids",
                value: "kids",
            },
            {
                label: "Accessories",
                value: "accessories",
            },
            {
                label: "Footwear",
                value: "footwear",
            }
        ]
    },
    {
        label: "Brand",
        name: "brand",
        componentType: "select",
        options: [
            {
                label: "Nike",
                value: "nike",
            },
            {
                label: "Adidas",
                value: "adidas",
            },
            {
                label: "Puma",
                value: "puma",
            },
            {
                label: "Levi's",
                value: "levi",
            },
            {
                label: "Zara",
                value: "zara",
            },
            {
                label: "H&M",
                value: "hm",
            }
        ]
    }, 
    {
        name: "salePrice",
        label: "Sale Price",
        type: "number",
        placeholder: "Enter product sale price",
        componentType: "input"
    },
    {
        label: "Total Stock",
        name: "totalStock",
        componentType: "input",
        type: "number",
        placeholder: "Enter product total stack",
    }
]

export const shoppingViewHeaderMenuItems = [
    {
        id: "home",
        label: "Home",
        link: "/shop/home",
    },
    {
        id: "products",
        label: "Products",
        link: "/shop/listing",
    },
    {
        id: "men",
        label: "Men",
        link: "/shop/listing",
    }, 
    {
        id: "women",
        label: "Women",
        link: "/shop/listing",
    }, 
    {
        id: "kids",
        label: "Kids",
        link: "/shop/listing",
    }, 
    {
        id: "accessories",
        label: "Accessories",
        link: "/shop/listing",
    },
    {
        id: "footwear",
        label: "Footwear",
        link: "/shop/listing",
    },
    {
        id: "search",
        label: "Search",
        link: "/shop/search",
    }
]

export const categoryOptionsMap = {
    men: "Men",
    women: "Women",
    kids: "Kids",
    accessories: "Accessories",
    footwear: "Footwear",
}

export const brandOptionsMap = {
    nike: "Nike",
    adidas: "Adidas",
    puma: "Puma",
    levi: "Lev's",
    zara: "Zara",
}
export const filterOptions = {
    category: [
        {label: "Men",id: "men"},
        {label: "Women",id: "women"},
        {label: "Kids",id: "kids"},
        {label: "Accessories",id: "accessories"},
        {label: "Footwear",id: "footwear"}
    ],
    brand: [
        {label: "Nike",id: "nike"},
        {label: "Adidas",id: "adidas"},
        {label: "Puma",id: "puma"},
        {label: "Levi's",id: "levi"},
        {label: "Zara",id: "zara"},
        {label: "H&M",id: "hm"}
    ]
}

export const sortOptions = [
    {id: 'price-asc', label: 'Price: Low to High'},
    {id: 'price-desc', label: 'Price: High to Low'},
    {id: "title-asc", label: "Title: A to Z"},
    {id: "title-desc", label: "Title: Z to A"},
]

export const addressFormControls = [
    {
        label: 'Address',
        name: 'address',
        componentType: 'input',
        type: 'text',
        placeholder: 'Enter your address',
    }, {
        label: 'City',
        name: 'city',
        componentType: 'input',
        type: 'text',
        placeholder: 'Enter your city',
    },
    {
        label: 'Pincode',
        name: 'pincode',
        componentType: 'input',
        type: 'text',
        placeholder: 'Enter your pincode',
    },
    {
        label: "Phone",
        name: "phone",
        componentType: "input",
        type: "text",
        placeholder: "Enter your phone number",
    },
    {
        label: "notes",
        name: "notes",
        componentType: "textarea",
        placeholder: "Enter your notes",
    }
]


