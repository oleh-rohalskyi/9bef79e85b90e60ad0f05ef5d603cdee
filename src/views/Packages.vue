<template>
  <v-container class="packages">
    <v-dialog shaped v-model="dialog">
      <div class="text-center">
        <v-card light>
          <div class="modal-sticky text-left">
            <v-btn class="ma-5" @click="dialog=false" dark>
              <v-icon dark left>mdi-arrow-left</v-icon>Back
            </v-btn>
          </div>
          <div>
            <v-progress-circular v-if="proccess" indeterminate color="purple"></v-progress-circular>
          </div>
          <v-list v-if="!proccess">
            <v-list-item-content>
              <v-list-item-title>Versions</v-list-item-title>
            </v-list-item-content>
            <v-list-item :key="item" v-for="item in current.versions">
              <v-list-item-content>
                <v-list-item-subtitle>{{item}}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card>
      </div>
    </v-dialog>
    <v-row>
      <v-col>
        <v-text-field
          autofocus
          hide-details
          label="Search packages"
          color="success"
          prepend-icon="mdi-magnify"
          @input="onSearchChange"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-simple-table v-if="isListData" color="success" class="pa-2">
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">Name</th>
                <th class="text-left">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr
                class="row-pointer"
                @click="openDialog(item.package.name)"
                v-for="item in list"
                :key="item.package.name"
              >
                <td>{{ item.package.name }}</td>
                <td>{{ item.package.description }}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-col>
    </v-row>
    <v-row v-if="isListData">
      <v-col class="text-center">
        <v-pagination
          color="success"
          v-model="page"
          :total-visible="11"
          :length="paginationLength"
          @input="pageChange"
        ></v-pagination>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { PACKAGES_STORE } from "@/store/packeges.store";
import { throttle } from "throttle-debounce";

export default {
  name: "Packages",
  data: () => ({
    page: 1,
    limit: 10,
    dialog: false,
    searchValue: ""
  }),
  created() {
    this.searchPackeges(this.requestOptions);
    this.throttleSearch = throttle(500, options => {
      this.searchPackeges(options);
    });
  },
  computed: {
    isListData() {
      return this.list.length;
    },
    versions() {
      return this.current.versions ? this.current.versions : [];
    },
    requestOptions() {
      return {
        searchValue: this.searchValue,
        page: this.page,
        limit: this.limit
      };
    },
    paginationLength() {
      return Math.round(this.total / this.limit);
    },
    ...mapState(PACKAGES_STORE, {
      list: state => state.list,
      total: state => state.total,
      proccess: state => state.proccess,
      current: state => state.current
    })
  },
  methods: {
    openDialog(name) {
      this.dialog = true;
      this.fetchAdditionalPackageData(name);
    },
    onSearchChange(text) {
      this.page = 1;
      this.searchValue = text;
      this.throttleSearch(this.requestOptions);
    },
    pageChange() {
      this.searchPackeges(this.requestOptions);
    },
    ...mapActions(PACKAGES_STORE, [
      "searchPackeges",
      "fetchAdditionalPackageData"
    ])
  }
};
</script>

<style lang="sass" scoped>
.row-pointer
  cursor: pointer
.modal-sticky
  position: sticky
  top: 0
  z-index: 1
  background-color: #1E1E1E
</style>