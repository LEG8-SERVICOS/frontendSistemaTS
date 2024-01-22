<template>
  <aside class="hidden sm:flex sm:flex-col">
    <RouterLink to="/admin/dashboard"
      class="inline-flex items-center justify-center h-20 w-20 bg-orange-600 hover:bg-orange-500 focus:bg-orange-500">
      <img src="../assets/leg8icon.png" class="h-11 w-10" alt="">
    </RouterLink>
    <div class="flex-grow flex flex-col justify-between text-gray-500 bg-gray-800">
      <nav class="flex flex-col mx-4 my-6 space-y-4">
        <RouterLink to="/admin/relatories"
          class="inline-flex items-center justify-center py-3 hover:text-gray-400 hover:bg-gray-700 focus:text-gray-400 focus:bg-gray-700 rounded-lg">
          <v-tooltip text="Relatório Geral">
            <template v-slot:activator="{ props }">
              <v-icon v-bind="props" class="h-11 w-10">mdi-chart-bar</v-icon>
            </template>
          </v-tooltip>
        </RouterLink>
        <RouterLink to="/admin/individual"
          class="inline-flex items-center justify-center py-3 hover:text-gray-400 hover:bg-gray-700 focus:text-gray-400 focus:bg-gray-700 rounded-lg">
          <v-tooltip text="Relatório de Produtividade">
            <template v-slot:activator="{ props }">
              <v-icon v-bind="props" class="h-6 w-6">mdi-chart-bell-curve-cumulative</v-icon>
            </template>
          </v-tooltip>
        </RouterLink>
      </nav>
    </div>
  </aside>
</template>