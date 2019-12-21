<template>
  <button @click="onClick">{{ text }}</button>
</template>

<script>
export default {
  name: "menu-button",
  props: ["text", "onClick"]
};
</script>

<style scoped>
button {
  padding: 0;
  cursor: pointer;
  font-size: 0.8em;
  color: white;
  font-weight: bold;
  text-align: center;
  background-color: transparent;
  border: none;
}

button:hover {
  color: #00adb5;
}

button:first-of-type {
  padding-top: 4em;
}

button:not(:last-child)::after {
  content: "";
  display: block;
  width: 50px;
  margin: 2.2em auto;
  border-bottom: 1px solid white;
}
</style>
