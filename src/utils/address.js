export const AddressUlti = (specificAddress, ward, district, province) => {
    return {
        get: () => `${specificAddress}, ${ward}, ${district}, ${province}, Việt Nam`
    }
}