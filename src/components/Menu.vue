<template>
  <div class="menu">
    <h1 class="title">Map Projector</h1>
    <div class="menu-option">Introduction</div>
    <div class="menu-option">Projection Surfaces</div>
    <div class="menu-option">Map Distortions</div>
    <div class="menu-option">Map Projections</div>
  </div>
</template>

<style scoped>
.menu {
  background-color: #222831;
  padding: 0.3em;
  color: white;
  font-weight: bold;
  text-align: center;
}

.menu-option {
  padding: 0;
  cursor: pointer;
  font-size: 0.8em;
}

.menu-option:hover {
  color: #bbb;
}

.menu-option:first-of-type {
  padding-top: 4em;
}

.menu-option:not(:last-child)::after {
  content: "";
  display: block;
  width: 50px;
  margin: 2.2em auto;
  border-bottom: 1px solid white;
}
</style>
