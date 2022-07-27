import request from '@/utils/request.js'
export const getSwiper = () => request({
    url: "/home/swiper"
})

export const getRentGroups = () => request({
    url: "/home/groups"
})