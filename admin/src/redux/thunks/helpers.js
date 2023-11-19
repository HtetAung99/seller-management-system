import CloudStorage from 'services/models/cloudStorage';
import CategoryAction from './categoryAction';
import VendorAction from './vendorAction';

export function processData(store, dispatch) {
  return async function insideFun(data) {
    const {
      vendors: { isInitial: isVendorInitial, vendors: vendorsFromState },
      categories: {
        isInitial: isCategoryInitial,
        categories: categoriesFromState,
      },
    } = store;

    const vendors = isVendorInitial
      ? await dispatch(VendorAction.fetchVendors()).unwrap()
      : vendorsFromState;

    const categories = isCategoryInitial
      ? await dispatch(CategoryAction.fetchCategories()).unwrap()
      : categoriesFromState;

    const linkedData = data.map((d) => {
      const category = categories?.filter(
        (category) => category.id === d.category_id
      )[0]?.name;
      const { name: vendor_name, phone: vendor_phone } = vendors?.filter(
        (vendor) => vendor.id === d.vendor_id
      )[0];
      return {
        ...d,
        vendor_name,
        vendor_phone,
        category,
      };
    });

    return await Promise.all([
      ...linkedData.map(async (d) => {
        const image = await CloudStorage.getProductImageUrl(d?.image);

        return {
          ...d,
          image,
        };
      }),
    ]);
  };
}
