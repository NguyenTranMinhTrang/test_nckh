import { StyleSheet } from "react-native";
import { SIZES } from "../constants";



export const styleGlobal = StyleSheet.create({
    flexRow: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    center: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    alignCenter: {
        alignItems: 'center',
    },
    justifyCenter: {
        justifyContent: 'center',
    },
    full: {
        flex: 1
    },
    spaceBetween: {
        justifyContent: 'space-between'
    },
    mr1: {
        marginRight: SIZES.base
    },
    ml1: {
        marginLeft: SIZES.base
    },
    mt1: {
        marginTop: SIZES.base
    },
    mb1: {
        marginBottom: SIZES.base
    },
    mv1: {
        marginVertical: SIZES.base
    },
    mh1: {
        marginHorizontal: SIZES.base
    },
    pr1: {
        paddingRight: SIZES.base
    },
    pl1: {
        paddingLeft: SIZES.base
    },
    pt1: {
        paddingTop: SIZES.base
    },
    pb1: {
        paddingBottom: SIZES.base
    },
    pv1: {
        paddingVertical: SIZES.base
    },
    ph1: {
        paddingHorizontal: SIZES.base
    },
    p1: {
        padding: SIZES.base,
    },
    m2: {
        padding: SIZES.base
    },
    mr2: {
        marginRight: SIZES.base * 2
    },
    ml2: {
        marginLeft: SIZES.base * 2
    },
    mt2: {
        marginTop: SIZES.base * 2
    },
    mb2: {
        marginBottom: SIZES.base * 2
    },
    mv2: {
        marginVertical: SIZES.base * 2
    },
    mh2: {
        marginHorizontal: SIZES.base * 2
    },
    p2: {
        padding: SIZES.base,
    },
    pr2: {
        paddingRight: SIZES.base * 2
    },
    pl2: {
        paddingLeft: SIZES.base * 2
    },
    pt2: {
        paddingTop: SIZES.base * 2
    },
    pb2: {
        paddingBottom: SIZES.base * 2
    },
    pv2: {
        paddingVertical: SIZES.base * 2
    },
    ph2: {
        paddingHorizontal: SIZES.base * 2
    },
    radius: {
        borderRadius: SIZES.base
    }
})