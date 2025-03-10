// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { access } from 'rizom/util'
import import_0 from 'lucide-svelte/icons/users-round';
import import_1 from 'rizom/plugins/cache/HeaderButton.svelte';
import import_2 from 'rizom/fields/email/component/Email.svelte';
import import_3 from 'rizom/fields/text/component/Text.svelte';
import import_4 from 'rizom/fields/date/component/Date.svelte';
import import_5 from 'rizom/fields/date/component/Cell.svelte';
import import_6 from 'rizom/fields/select/component/Select.svelte';

const isEmptyFn_0 = (value) => !value;
const createFn_1 = (user) => !!user;
const readFn_2 = () => true;
const validateFn_3 = (value) => {
                return typeof value === 'string' || 'Should be a string';
            };
const defaultValueFn_4 = () => {
                const date = new Date();
                date.setHours(0, 0, 0, 0);
                return date;
            };
const updateFn_5 = () => false;
const validateFn_6 = (value) => {
    if (typeof value !== 'string') {
        return "not_a_string";
    };
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        return "invalid_email";
    };
    return true;
};
const isEmptyFn_7 = (value) => Array.isArray(value) && value.length === 0;
const createFn_8 = (user) => !!user && access.isAdmin(user);
const validateFn_9 = (value, { config }) => {
    const selected = value;
    const validValues = config.options.map((o) => o.value);
    if (selected && Array.isArray(selected)) {
        for (const value of selected) {
            if (!validValues.includes(value)) {
                return `Value should be one of these : ${validValues.join('|')}`;
            }
        }
    }
    else if (typeof selected === 'string') {
        if (!validValues.includes(selected)) {
            return `Value should be one of these : ${validValues.join('|')}`;
        }
    };
    return true;
};
const createFn_10 = (user) => access.isAdmin(user);
const updateFn_11 = (user, { id }) => access.isAdminOrMe(user, id);

/**
 * @type {import('rizom').BrowserConfig}
 */
const config = {collections: [{'group': "content",'fields': [{'type': "text",'live': true,'name': "title",'defaultValue': null,'isEmpty': isEmptyFn_0,'access': {'create': createFn_1,'update': createFn_1,'read': readFn_2},'isTitle': true,'validate': validateFn_3,'placeholder': "Title"},{'type': "date",'live': true,'name': "createdAt",'defaultValue': defaultValueFn_4,'isEmpty': isEmptyFn_0,'access': {'create': createFn_1,'update': createFn_1,'read': readFn_2},'hooks': {},'hidden': true},{'type': "date",'live': true,'name': "updatedAt",'defaultValue': defaultValueFn_4,'isEmpty': isEmptyFn_0,'access': {'create': createFn_1,'update': createFn_1,'read': readFn_2},'hooks': {},'hidden': true},{'type': "text",'live': true,'name': "editedBy",'defaultValue': null,'isEmpty': isEmptyFn_0,'access': {'create': createFn_1,'update': createFn_1,'read': readFn_2},'hidden': true,'validate': validateFn_3,'placeholder': "EditedBy"}],'slug': "pages",'label': {'singular': "Pages",'plural': "Pages",'gender': "m"},'asTitle': "title",'type': "collection",'access': {'create': createFn_1,'read': createFn_1,'update': createFn_1,'delete': createFn_1}},{'label': {'singular': "User",'plural': "Users",'gender': "m"},'auth': true,'icon': import_0,'fields': [{'type': "text",'live': true,'name': "name",'defaultValue': null,'isEmpty': isEmptyFn_0,'access': {'create': createFn_1,'update': updateFn_5,'read': readFn_2},'required': true,'validate': validateFn_3,'placeholder': "Name"},{'type': "email",'live': true,'name': "email",'defaultValue': null,'isEmpty': isEmptyFn_0,'access': {'create': createFn_1,'update': updateFn_5,'read': createFn_1},'validate': validateFn_6,'required': true,'unique': true},{'type': "select",'live': true,'name': "roles",'defaultValue': ["user"],'isEmpty': isEmptyFn_7,'access': {'create': createFn_8,'update': createFn_8,'read': createFn_8},'validate': validateFn_9,'options': [{'value': "admin",'label': "Admin"},{'value': "user",'label': "User"}],'many': true,'required': true},{'type': "date",'live': true,'name': "createdAt",'defaultValue': defaultValueFn_4,'isEmpty': isEmptyFn_0,'access': {'create': createFn_1,'update': createFn_1,'read': readFn_2},'hooks': {},'hidden': true},{'type': "date",'live': true,'name': "updatedAt",'defaultValue': defaultValueFn_4,'isEmpty': isEmptyFn_0,'access': {'create': createFn_1,'update': createFn_1,'read': readFn_2},'hooks': {},'hidden': true},{'type': "text",'live': true,'name': "editedBy",'defaultValue': null,'isEmpty': isEmptyFn_0,'access': {'create': createFn_1,'update': createFn_1,'read': readFn_2},'hidden': true,'validate': validateFn_3,'placeholder': "EditedBy"}],'group': "system",'access': {'create': createFn_10,'read': createFn_1,'update': updateFn_11,'delete': createFn_10},'slug': "users",'asTitle': "email",'type': "collection"}],areas: [],panel: {'language': "en",'components': {'header': [import_1]}},icons: {'users': import_0},blueprints: {'email': {'component': import_2,'cell': null},'text': {'component': import_3,'cell': null},'date': {'component': import_4,'cell': import_5},'select': {'component': import_6,'cell': null}}};
export default config