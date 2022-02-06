import { useState } from "react";
import { Header, SerchForm, Input } from "./Serchbar.styled";
import IconButton from "../Icon-Button/Icon-Button";
import { ReactComponent as SerchIcon } from "../../icons/serch.svg";
import toast from "react-hot-toast";

export default function Searchbar({ onSubmit }) {
  const [serchQuery, setSerchQuery] = useState("");

  const handleChange = (event) => {
    const { value } = event.currentTarget;
    setSerchQuery(value.toLowerCase());
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (serchQuery.trim() === "") {
      return toast("Type something please", {
        style: {
          background: "#f6f7c1",
          color: "black",
        },
      });
    }
    onSubmit(serchQuery);
  };

  return (
    <Header>
      <SerchForm onSubmit={handleSubmit}>
        <IconButton type="submit">
          <SerchIcon width="32" heigth="32" />
        </IconButton>

        <Input
          className="input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={serchQuery}
          onChange={handleChange}
        />
      </SerchForm>
    </Header>
  );
}
