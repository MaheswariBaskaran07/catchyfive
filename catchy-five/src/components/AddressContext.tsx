import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from 'react';

export interface Address {
  id: string;
  name: string;
  phone: string;
  line1: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

interface AddressContextProps {
  addresses: Address[];
  saveAddress: (addr: Address) => void;
  deleteAddress: (id: string) => void;
}

const AddressContext = createContext<AddressContextProps>({
  addresses: [],
  saveAddress: () => {},
  deleteAddress: () => {},
});

interface ProviderProps {
  children: ReactNode;
}

export const AddressProvider = ({ children }: ProviderProps) => {
  const [addresses, setAddresses] = useState<Address[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('user_addresses');
    if (stored) {
      setAddresses(JSON.parse(stored));
    }
  }, []);

  const saveAddress = (addr: Address) => {
    setAddresses((prev) => {
      const exists = prev.find((a) => a.id === addr.id);
      const updated = exists
        ? prev.map((a) => (a.id === addr.id ? addr : a))
        : [...prev, addr];
      localStorage.setItem('user_addresses', JSON.stringify(updated));
      return updated;
    });
  };

  const deleteAddress = (id: string) => {
    setAddresses((prev) => {
      const updated = prev.filter((a) => a.id !== id);
      localStorage.setItem('user_addresses', JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <AddressContext.Provider value={{ addresses, saveAddress, deleteAddress }}>
      {children}
    </AddressContext.Provider>
  );
};

export const useAddress = () => useContext(AddressContext);
