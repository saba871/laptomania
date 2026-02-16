import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";


const LeptopsContext = createContext();

export const useLeptop = () => useContext(LeptopsContext);

const API_URL = import.meta.env.VITE_API_URL + '/api';

export const LeptopsProvider = ({children}) => {
  const [leptops, setLeptops] = useState([]);
  const [cart, setCart] = useState([]);

  // მოგვაქვს ყველა leptop
  const getLeptops = async() => {
    try {
      const res = await fetch(`${API_URL}/laptops`);

      const result = await res.json();

      setLeptops(result);
    } catch(error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getLeptops();
  }, [])


  // ამატებს პროდუქტს კალათაში
  const addToCart = (prod) => {
    const laptop = cart.find((obj) => obj._id === prod._id);

    if(laptop) {
        setCart(prev => prev.map(item => item._id === prod._id ? {...item, quantity: item.quantity + 1} : item));
    } else {
        setCart(prev => [...prev, {...prod, quantity: 1}]);
    }
  }


  // შლის პროდუქტს კალათიდან
  const romveFromCart = (obj) => {
    if(obj.quantity === 1) {
      setCart(prev => prev.filter(item => item._id !== obj._id));
    } else {
      setCart(prev => prev.map(item => item._id === obj._id ? {...item, quantity: item.quantity - 1} : item));
    }
  }


  // ასუფთავებს კალათას
  const removeAll = () => {
    setCart([]);
  }


  // მეხმარება რომ წავშალო ლეპტოპი
  const deleteLeptop = async(id) => {
    const toasId = toast.loading('deleting...');

    console.log(toasId);
    try {
      const res = await fetch(`${API_URL}/laptops/${id}`, {
        method: 'DELETE',
        credentials: 'include'
      });

      setLeptops(prev => prev.filter(leptop => leptop._id !== id));
      toast.update(toasId, {
        render: 'Laptop deleted Successfully',
        type: 'success',
        isLoading: false,
        autoClose: 2000
      })
    } catch(err) {
      toast.update(toasId, {
        render: `Error: ${err.message}`,
        type: 'error',
        isLoading: false,
        autoClose: 2000
      })
    }
  }

  // ანახლებს laptop-ის infos
  const updateLaptop = async(id, formData) => {
    const toasId = toast.loading('Updating...');
    try {
      const res = await fetch(`${API_URL}/laptops/${id}`, {
        method: 'PATCH',
        credentials: 'include',
        body: formData
      });

      const result = await res.json();
      setLeptops(prev => prev.map(leptop => leptop._id === id ? result : leptop));

      toast.update(toasId, {
        render: 'Laptop updated Successfully',
        type: 'success',
        isLoading: false,
        autoClose: 2000
      })
    } catch(err) {
      toast.update(toasId, {
        render: `Error: ${err.message}`,
        type: 'error',
        isLoading: false,
        autoClose: 2000
      })
    }
  }


  // დამატებს laptop-ს
  const addLaptop = async(formData) => {
    const toasId = toast.loading('Adding...');

    try {
      const res = await fetch(`${API_URL}/laptops`, {
        method: 'POST',
        credentials: 'include',
        body: formData
      });

      const result = await res.json();

      setLeptops(prev => [...prev, result]);

      toast.update(toasId, {
        render: 'Laptop added Successfully',
        type: 'success',
        isLoading: false,
        autoClose: 2000
      })
    } catch(err) {
      toast.update(toasId, {
        render: `Error: ${err.message}`,
        type: 'error',
        isLoading: false,
        autoClose: 2000
      })
    }
  }


  const proccedToCheckOut = async () => {
    try {
        const response = await fetch(`${API_URL}/checkout`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(cart.map((prod) => prod._id)),
            credentials: 'include'
        })

        const data = await response.json();

        window.location.href = data.url;
    } catch (error) {
        console.log(error)
    }
  }


  return (
    <LeptopsContext.Provider value={{ proccedToCheckOut, leptops, deleteLeptop, updateLaptop, addLaptop, addToCart, cart, romveFromCart, removeAll }}>
      {children}
    </LeptopsContext.Provider>
  )
}
