import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import dayjs from "dayjs";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function validateEmail(email) {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
}

export function validatePhone(phone) {
  return String(phone)
    .toLowerCase()
    .match(/^\+[1-9]\d{9,14}$/);
}

export function formatDate(date) {
  return dayjs(date).format("DD-MMM-YYYY HH:mm:ss");
}

export const pause = function (time) {
  // handy pause function to await
  return new Promise((resolve) => setTimeout(resolve, Number(time)));
};

export const convertToBase64 = async (selectedFile) => {
  let img64 = "";
  const reader = new FileReader();

  reader.readAsDataURL(selectedFile);

  reader.onloadend = () => {
    console.log("called: ", reader);
    let img = reader.result;
    console.log("img: ", img);
    img64 = img;
  };
  await pause(2000);
  return img64;
};

export const imageUrlToBase64 = async (url) => {
  const data = await fetch(url);
  const blob = await data.blob();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = () => {
      const base64data = reader.result;
      resolve(base64data);
    };
    reader.onerror = reject;
  });
};
