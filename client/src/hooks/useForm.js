import { useState } from "react";

export const useForm = (initValues) => {
  const [formData, setformData] = useState(initValues);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setformData(prev => ({ ...prev, [name]: value }));
  }

  return [formData, handleChange];
}
