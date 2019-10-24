import { Vue, Component } from "vue-property-decorator";
import PageData from '../../../data/PageData';

export default class AddDialog extends Vue {
    private data: any = new PageData();

    private item: any = {};
    private modals: any = {};
    private date: string = new Date().toISOString().substr(0, 10);
    private wizard: number = 1;

    public selectedBarber: any = {
        info: {
            name: "",
            job: ""
        },
        picture: {
            img: "",
            scala: 100,
            x: 0,
            y: 0
        }
    };

    get model(): boolean {
        return this['value'];
    }

    set model(model: boolean) {
        this.$emit("input", model);
    }

    next() {
        if (this["steps"].length > this.wizard) this.wizard += 1;
    }

    prev() {
        if (this["steps"].length > 0) this.wizard -= 1;
    }

    jump(value: number) {
        if (value >= 0 && value <= this["steps"].length) {
            this.wizard = value;
        }
    }

    /**
     * @name GET_FIELD_TYPE
     * @description return a type of component by a type string
     */
    getFieldType(type: string): string {
        let component: string = "";
        if (type == "input") component = "v-text-field";
        if (type == "select") component = "v-select";
        if (type == "list") component = "x-list";
        if (type == "checkbox") component = "v-checkbox";
        if (type == "date") component = "v-date-picker";

        return component;
    }

    /**
     * @name ERROR_FIELD
     * @description Check the required fields and return if there is an empty one
     */
    // errorField(field: any) {
    //     let error = false;
    //     if (field.required && !this.item[field.name]) {
    //         error = true;
    //     }
    //     return error;
    // }

    /**s
     * @name EVENT
     * @description emits the "event" method to the parent
     */
    // event() {
    //     this.errors = false;
    //     this.steps.map((step: any, index: number) => {
    //         let form = "step" + (index + 1);

    //         if (!this.$refs[form][0].validate()) {
    //             this.errors = true;
    //             this.wizard = index + 1;
    //         }
    //     });
    //     if (!this.errors) {
    //         this.$emit("event", this.item);
    //     }
    // }

    // saveDate(date: any) {
    //     this.$refs["dialog1"][0].save(date.toString());
    //     this.modal = false;
    // }

    //start: open the barberShop
    //end: close the barberShop
    //workTime: val of division of the time
    getHours(workTime: number) {
        return ["10:00", "11:00", "12:00", "13:00",
            "14:00", "15:00", "16:00", "17:00", "18:00",
            "19:00", "20:00"];
    }
}