<template>
  <div class="explore__main__table">
    <ag-grid-vue
      style="width: 100%; height: 75rem"
      class="ag-theme-material"
      :class="{ darkTable: isDarkTheme }"
      :defaultColDef="defaultColDef"
      :columnDefs="columnDefs"
      :rowData="btcMC"
      :rowHeight="51.5"
      :rowSelection="'single'"
      :paginationAutoPageSize="true"
      :pagination="true"
      @selection-changed="onSelectionChanged"
      @grid-ready="onGridReady"
    >
    </ag-grid-vue>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { computed } from "@vue/runtime-core";

import tableConfig from "../../../configs/table/tableConfig";
import coinCellRenderer from "./TableConfigs/coinCellRenderer.vue";
import priceCellRenderer from "./TableConfigs/priceCellRenderer.vue";
import priceChangeCellRenderer from "./TableConfigs/priceChangeCellRenderer.vue";
import marketCapCellRenderer from "./TableConfigs/marketCapCellRenderer.vue";
import volumeCellRenderer from "./TableConfigs/volumeCellRenderer.vue";
import volumeChangeCellRenderer from "./TableConfigs/volumeChangeCellRenderer.vue";

import { AgGridVue } from "ag-grid-vue3";

export default {
  components: {
    AgGridVue, // eslint-disable-next-line
    coinCellRenderer, // eslint-disable-next-line
    priceCellRenderer, // eslint-disable-next-line
    priceChangeCellRenderer, // eslint-disable-next-line
    marketCapCellRenderer, // eslint-disable-next-line
    volumeCellRenderer, // eslint-disable-next-line
    volumeChangeCellRenderer, // eslint-disable-next-line
  },
  setup() {
    const router = useRouter();
    const store = useStore();
    let isDarkTheme = computed(() => store.getters.isDarkTheme);

    let gridApi = null;
    let columnApi = null;
    let defaultColDef = {
      sortable: true,
    };

    let columnDefs = tableConfig.getColumnDef();
    let btcMC = computed(() => store.getters.getTop100);

    function onSelectionChanged() {
      const selectedRows = gridApi.getSelectedRows();
      selectedRows.length === 1
        ? router.push(`/app/explore/${selectedRows[0].id}`)
        : console.log("NOT SUCCESSFUL");
    }

    function onGridReady(params) {
      gridApi = params.api;
      columnApi = params.columnApi;
    }

    return {
      columnDefs,
      btcMC,
      defaultColDef,
      gridApi,
      columnApi,
      onGridReady,
      onSelectionChanged,
      isDarkTheme,
    };
  },
};
</script>

<style lang="scss">
@import "~ag-grid-community/dist/styles/ag-grid.css";
@import "~ag-grid-community/dist/styles/ag-theme-material.css";

.explore__main__table {
  width: 100%;
  min-height: 75rem;
}

.ag-theme-material {
  font-family: "Lato", sans-serif;
  font-size: 1.6rem;
  font-weight: 700;
  border-radius: 5px;
  box-shadow: 0px 2px 8px 0px rgba(99, 99, 99, 0.2);

  .ag-root-wrapper {
    border-radius: 5px;
    box-shadow: 0px 2px 8px 0px rgba(99, 99, 99, 0.2);
  }

  .ag-row {
    cursor: pointer;
  }

  .ag-cell-focus {
    border: transparent;
  }

  .ag-has-focus {
    border: transparent;
  }

  .ag-paging-panel {
    @media only screen and (max-width: 58em) {
      font-size: 1rem;
    }
  }
}

.ag-header-cell-label {
  font-size: 1.6rem;
}

//! FOR DARK MODE
.darkTable {
  background-color: #22233c;
  box-shadow: none !important;

  .ag-root-wrapper {
    background-color: #22233c;
    box-shadow: none;
  }
  .ag-header-cell-label {
    color: #eeeeee;
  }

  .ag-row {
    color: #eeeeee;
  }

  .ag-header {
    background-color: #22233c;
  }

  .ag-row-even {
    background-color: #22233c;
  }

  .ag-row-hover {
    background-color: #303255;
  }

  .ag-row-focus {
    background-color: #303255;
  }

  .ag-paging-button {
    .ag-disabled {
      color: red !important;
    }
  }

  .ag-disabled span.ag-icon {
    color: #757575;
  }

  .ag-paging-panel {
    color: #eeeeee;
  }
}
</style>