const router = require(`express`).Router()

const carsModel = require(`../models/cars`);

const jwt = require('jsonwebtoken')

const fs = require('fs')
const JWT_PRIVATE_KEY = fs.readFileSync(process.env.JWT_PRIVATE_KEY_FILENAME, 'utf8')

const multer = require('multer')
var upload = multer({ dest: `${process.env.UPLOADED_FILES_FOLDER}` })

let shoes =
    [
        { "id": 1, "name": "Nike React Infinity Run Flyknit", "brand": "NIKE", "gender": "MEN", "category": "RUNNING", "price": 160, "is_in_inventory": true, "items_left": 3, "imageURL": "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/i1-665455a5-45de-40fb-945f-c1852b82400d/react-infinity-run-flyknit-mens-running-shoe-zX42Nc.jpg", "slug": "nike-react-infinity-run-flyknit", "photos":["https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/i1-665455a5-45de-40fb-945f-c1852b82400d/react-infinity-run-flyknit-mens-running-shoe-zX42Nc.jpg", "https://di2ponv0v5otw.cloudfront.net/posts/2022/03/16/6231bf4b6c6ac7be764f4496/m_wp_6231bf4d0f00c33a85c67048.webp", "https://di2ponv0v5otw.cloudfront.net/posts/2022/03/16/6231bf4b6c6ac7be764f4496/m_wp_6231bf4e6200d1933210a9a9.webp", "https://di2ponv0v5otw.cloudfront.net/posts/2022/03/16/6231bf4b6c6ac7be764f4496/m_wp_6231bf4e3d6119d1d05f4e0f.webp", "https://di2ponv0v5otw.cloudfront.net/posts/2022/03/16/6231bf4b6c6ac7be764f4496/m_wp_6231bf4f6ab2f49adaea617e.webp", "https://di2ponv0v5otw.cloudfront.net/posts/2022/03/16/6231bf4b6c6ac7be764f4496/m_wp_6231bf4f7824da48405ad0e1.webp", "https://pa.namshicdn.com/product/A8/77568W/2-zoom-desktop.jpg", "https://pa.namshicdn.com/product/A8/77568W/3-zoom-desktop.jpg", "https://pa.namshicdn.com/product/A8/77568W/4-zoom-desktop.jpg", "https://cdn.fashdirect.com/webadmin/items/website/1389502/pi_quality_10_image_2_114690676552_8.jpg"], "color": "Grey", "sizes": ["8", "9", "10"]},
        { "id": 2, "name": "Nike React Miler", "brand": "NIKE", "gender": "MEN", "category": "RUNNING", "price": 130, "is_in_inventory": true, "items_left": 3, "imageURL": "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/i1-5cc7de3b-2afc-49c2-a1e4-0508997d09e6/react-miler-mens-running-shoe-DgF6nr.jpg", "slug": "nike-react-miler", "photos":["https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/i1-5cc7de3b-2afc-49c2-a1e4-0508997d09e6/react-miler-mens-running-shoe-DgF6nr.jpg", "https://i31.takemore.net/images/products/55/13/78/nike-cw1777001-react_miler-2.jpg", "https://i31.takemore.net/images/products/55/13/78/nike-cw1777001-react_miler-3.jpg", "https://i31.takemore.net/images/products/55/13/78/nike-cw1777001-react_miler-5.jpg"], "color": "Black", "sizes": ["7", "9", "10"]},
        { "id": 3, "name": "Nike Air Zoom Pegasus 37", "brand": "NIKE", "gender": "WOMEN", "category": "RUNNING", "price": 120, "is_in_inventory": true, "items_left": 3, "imageURL": "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/i1-33b0a0a5-c171-46cc-ad20-04a768703e47/air-zoom-pegasus-37-womens-running-shoe-Jl0bDf.jpg", "photos":["https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/i1-33b0a0a5-c171-46cc-ad20-04a768703e47/air-zoom-pegasus-37-womens-running-shoe-Jl0bDf.jpg", "https://i.ebayimg.com/images/g/GdkAAOSw1Bljovvk/s-l1600.jpg"], "slug": "nike-air-zoom-pegasus-37", "color": "White","sizes": ["8", "9"]},
        { "id": 4, "name": "Nike Joyride Run Flyknit", "brand": "NIKE", "gender": "WOMEN", "category": "RUNNING", "price": 180, "is_in_inventory": true, "items_left": 3, "imageURL": "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/99a7d3cb-e40c-4474-91c2-0f2e6d231fd2/joyride-run-flyknit-womens-running-shoe-HcfnJd.jpg", "photos":["https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/99a7d3cb-e40c-4474-91c2-0f2e6d231fd2/joyride-run-flyknit-womens-running-shoe-HcfnJd.jpg", "https://cdn.shopify.com/s/files/1/0603/3031/1875/products/2_7373d69e-0113-44b6-8ecc-a8ef2954f1cd_540x.jpg?v=1656274032", "https://cdn.shopify.com/s/files/1/0603/3031/1875/products/3_56d4fc93-0aba-4c7d-9a69-ee54b63b094b_540x.jpg?v=1656274032"], "slug": "nike-joyride-run-flyknit", "color": "Pink","sizes": ["8", "9"]},
        { "id": 5, "name": "Nike Mercurial Vapor 13 Elite FG", "brand": "NIKE", "gender": "WOMEN", "category": "FOOTBALL", "price": 250, "is_in_inventory": true, "items_left": 3, "imageURL": "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/9dda6202-e2ff-4711-9a09-0fcb7d90c164/mercurial-vapor-13-elite-fg-firm-ground-soccer-cleat-14MsF2.jpg", "photos":["https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/9dda6202-e2ff-4711-9a09-0fcb7d90c164/mercurial-vapor-13-elite-fg-firm-ground-soccer-cleat-14MsF2.jpg", "https://media.foot-store.com/catalog/product/cache/image/1800x/9df78eab33525d08d6e5fb8d27136e95/n/i/nike-vapor-13-elite-ag-pro-27875.jpg", "https://media.foot-store.com/catalog/product/cache/image/1800x/9df78eab33525d08d6e5fb8d27136e95/a/t/at7895-906_-.jpg"], "slug": "nike-mercurial-vapor-13-elite-fg",  "color": "Grey","sizes": ["8", "9"] },
        { "id": 6, "name": "Nike Phantom Vision Elite Dynamic Fit FG", "brand": "NIKE", "gender": "WOMEN", "category": "FOOTBALL", "price": 150, "is_in_inventory": true, "items_left": 3, "imageURL": "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/s1amp7uosrn0nqpsxeue/phantom-vision-elite-dynamic-fit-fg-firm-ground-soccer-cleat-19Kv1V.jpg", "photos": ["https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/s1amp7uosrn0nqpsxeue/phantom-vision-elite-dynamic-fit-fg-firm-ground-soccer-cleat-19Kv1V.jpg", "https://keeshoes.com/a/ale/auction_image/image1_94221.s790/nike-phantom-vsn-elite-df-fg-ao3262-080-soccer-shoes-black-multicolored-790x790.jpeg?_=1640404652.56094071", "https://keeshoes.com/a/ale/galeries_image/image_517451.s790/nike-phantom-vsn-elite-df-fg-ao3262-080-soccer-shoes-black-multicolored-3-790x790.jpeg?_=1626815249.76202441"], "slug": "nike-phantom-vision-elite-dynamic-fit-fg",  "color": "Black","sizes": ["8", "9"] },
        { "id": 7, "name": "Nike Phantom Venom Academy FG", "brand": "NIKE", "gender": "WOMEN", "category": "FOOTBALL", "price": 80, "is_in_inventory": true, "items_left": 3, "imageURL": "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/whegph8z9ornhxklc8rp/phantom-venom-academy-fg-firm-ground-soccer-cleat-6JVNll.jpg", "photos":["https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/whegph8z9ornhxklc8rp/phantom-venom-academy-fg-firm-ground-soccer-cleat-6JVNll.jpg", "https://www.sportsdirect.com/images/products/20140012_l.jpg", "https://www.sportsdirect.com/images/products/20140012_l_a4.jpg"], "slug": "nike-phantom-venom-academy-fg",  "color": "Red","sizes": ["8", "9"] },
        { "id": 8, "name": "Nike Mercurial Vapor 13 Elite Tech Craft FG", "brand": "NIKE", "gender": "MEN", "category": "FOOTBALL", "price": 145, "is_in_inventory": true, "items_left": 3, "imageURL": "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/vhbwnkor8sxt8qtecgia/mercurial-vapor-13-elite-tech-craft-fg-firm-ground-soccer-cleat-l38JPj.jpg", "photos": ["https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/vhbwnkor8sxt8qtecgia/mercurial-vapor-13-elite-tech-craft-fg-firm-ground-soccer-cleat-l38JPj.jpg","https://www.colgansports.ie/wp-content/uploads/2021/08/nike-mercurial-vapor-14-club-fg-mg-jr-cv0823-004-football-shoes-black-black-790x790-1-e1629808536920.jpeg", "https://www.colgansports.ie/wp-content/uploads/2021/08/nike-jr-mercurial-vapor-14-club-fg-mg-cv0823-004-2-e1629808543682.jpg"], "slug": "nike-mercurial-vapor-13-elite-tech-craft-fg",  "color": "Black","sizes": ["8", "9"] },
        { "id": 9, "name": "Nike Mercurial Superfly 7 Pro MDS FG", "brand": "NIKE", "gender": "MEN", "category": "FOOTBALL", "price": 137, "is_in_inventory": true, "items_left": 3, "imageURL": "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/i1-a52a8aec-22dc-4982-961b-75c5f4c72805/mercurial-superfly-7-pro-mds-fg-firm-ground-soccer-cleat-mhcpdN.jpg", "photos": ["https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/i1-a52a8aec-22dc-4982-961b-75c5f4c72805/mercurial-superfly-7-pro-mds-fg-firm-ground-soccer-cleat-mhcpdN.jpg", "https://www.tradeinn.com/f/13736/137367733_4/nike-mercurial-vapor-xiii-pro-mds-fg-football-boots.jpg", "https://www.tradeinn.com/f/13736/137367733/nike-mercurial-vapor-xiii-pro-mds-fg-football-boots.jpg"], "slug": "nike-mercurial-superfly-7-pro-mds-fg",  "color": "Green","sizes": ["8", "9"] },
        { "id": 10, "name": "Nike Air Force 1", "brand": "NIKE", "gender": "KIDS", "category": "CASUAL", "price": 90, "is_in_inventory": true, "items_left": 3, "imageURL": "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/178b2a46-3ee4-492b-882e-f71efdd53a36/air-force-1-big-kids-shoe-2zqp8D.jpg", "photos": ["https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/178b2a46-3ee4-492b-882e-f71efdd53a36/air-force-1-big-kids-shoe-2zqp8D.jpg", "https://sneakernews.com/wp-content/uploads/2020/06/Nike-Air-Force-1-Sky-Nike-CW6011_001-4.jpg", "http://t2.gstatic.com/images?q=tbn:ANd9GcRF_QFTmpoag-EdtIXwtg9fo4FGPBpFdeMlYuoT62SXzC07ouYM"], "slug": "nike-air-force-1",  "color": "Grey","sizes": ["8", "9"]},
        { "id": 11, "name": "Nike Air Max 90", "brand": "NIKE", "gender": "KIDS", "category": "CASUAL", "price": 100, "is_in_inventory": true, "items_left": 3, "imageURL": "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/8439f823-86cf-4086-81d2-4f9ff9a66866/air-max-90-big-kids-shoe-1wzwJM.jpg", "photos": ["https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/8439f823-86cf-4086-81d2-4f9ff9a66866/air-max-90-big-kids-shoe-1wzwJM.jpg", "https://cdn11.bigcommerce.com/s-pbq04mq4he/images/stencil/original/products/7136/7179/c3751640-059d-48e3-a9fd-c5788f8eb27d__26401.1669998394.jpg?c=1", "https://cdn11.bigcommerce.com/s-pbq04mq4he/images/stencil/original/products/7136/7180/2c46cbaa-a817-43ee-aa0c-6723c87ea9ff__93674.1669998394.jpg?c=1"], "slug": "nike-air-max-90",  "color": "White","sizes": ["8", "9"]},
        { "id": 12, "name": "Nike Air Max 90 LTR", "brand": "NIKE", "gender": "KIDS", "category": "CASUAL", "price": 110, "is_in_inventory": true, "items_left": 3, "imageURL": "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/i1-620aeb37-1b28-44b0-9b14-5572f8cbc948/air-max-90-ltr-big-kids-shoe-hdNLQ5.jpg","photos": ["https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/i1-620aeb37-1b28-44b0-9b14-5572f8cbc948/air-max-90-ltr-big-kids-shoe-hdNLQ5.jpg", "https://img.shopstyle-cdn.com/sim/8d/bc/8dbc6d7fad832c47f55ecbbf67438d0e_best/air-max-90-ltr-sneakers.jpg", "https://img.shopstyle-cdn.com/sim/d1/1c/d11c181a69e93c8e44100b42404e7599_best/air-max-90-ltr-sneakers.jpg"], "slug": "nike-air-max-90-ltr",  "color": "Green","sizes": ["8", "9"] },
        { "id": 13, "name": "Nike Joyride Dual Run", "brand": "NIKE", "gender": "KIDS", "category": "RUNNING", "price": 110, "is_in_inventory": false, "items_left": 3, "imageURL": "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/33888130-0320-41a1-ba53-a026decd8aa2/joyride-dual-run-big-kids-running-shoe-1HDJF8.jpg", "photos": ["https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/33888130-0320-41a1-ba53-a026decd8aa2/joyride-dual-run-big-kids-running-shoe-1HDJF8.jpg", "https://2app.kicksonfire.com/kofapp/upload/events_images/ipad_nike-joyride-dual-run-gs-pink-glow-black-0.jpg", "https://2app.kicksonfire.com/kofapp/upload/events_images/ipad_nike-joyride-dual-run-gs-pink-glow-black-4.jpg"], "slug": "nike-joyride-dual-run",  "color": "Pink","sizes": ["8", "9"]},
        { "id": 14, "name": "Nike Renew Run", "brand": "NIKE", "gender": "KIDS", "category": "RUNNING", "price": 80, "is_in_inventory": true, "items_left": 3, "imageURL": "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/i1-73e54c0b-11a6-478b-9f90-bd97fcde872d/renew-run-big-kids-running-shoe-5Bpz93.jpg", "photos": ["https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/i1-73e54c0b-11a6-478b-9f90-bd97fcde872d/renew-run-big-kids-running-shoe-5Bpz93.jpg", "https://i5.walmartimages.com/asr/fdaa8210-e7bd-4c7e-81c0-fd5db95d3fa3.2ed844e44f446e2927e3f749f525f0d8.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF", "https://i5.walmartimages.com/asr/c8b403c4-edda-42a4-b453-a4410b76feb4.0db23a3bd4d5b87602188035caf76af3.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF"], "slug": "nike-renew-run",  "color": "White","sizes": ["8", "9"]},
        { "id": 16, "name": "Bridgport Advice", "brand": "HUSHPUPPIES", "gender": "MEN", "category": "FORMAL", "price": 30, "is_in_inventory": true, "items_left": 4, "imageURL": "https://i5.walmartimages.com/asr/eaae3a88-5367-49dd-b8e6-ac22e575406e.23b46db46780c0e7fbb00f1df4114419.jpeg?odnHeight=2000&odnWidth=2000&odnBg=ffffff", "photos": ["https://i5.walmartimages.com/asr/eaae3a88-5367-49dd-b8e6-ac22e575406e.23b46db46780c0e7fbb00f1df4114419.jpeg?odnHeight=2000&odnWidth=2000&odnBg=ffffff", "https://www.padmore-barnes.com/wp-content/uploads/2022/04/P404VColourNegroLeatherN91-787x787.jpg", "https://www.padmore-barnes.com/wp-content/uploads/2022/04/P404VColourNegroLeatherN94-787x787.jpg"], "slug": "bridgport-advice",  "color": "Black","sizes": ["8", "9"] },
        { "id": 15, "name": "Beck", "brand": "HUSHPUPPIES", "gender": "MEN", "category": "FORMAL", "price": 80, "is_in_inventory": true, "items_left": 5, "imageURL": "https://i5.walmartimages.com/asr/0e53fc06-8998-47e9-9c9a-bc721fb13e59.11cf7f90fc63d4dda7afcfd572664dd0.jpeg", "photos": ["https://i5.walmartimages.com/asr/0e53fc06-8998-47e9-9c9a-bc721fb13e59.11cf7f90fc63d4dda7afcfd572664dd0.jpeg", "https://image-resizing.booztcdn.com/clarks/clr26162265_cblackleather_v0g.webp?has_grey=1&has_webp=0&size=source_wide", "https://image-resizing.booztcdn.com/clarks/clr26162265_cblackleather_v0g_2.webp?has_grey=1&has_webp=0&size=source_wide"], "slug": "beck",  "color": "Black","sizes": ["8", "9"]},
        { "id": 17, "name": "Fester", "brand": "HUSHPUPPIES", "gender": "MEN", "category": "FORMAL", "price": 70, "is_in_inventory": true, "items_left": 6, "imageURL": "https://cdn.shopify.com/s/files/1/2728/6638/products/gbt-27082-57014-f-i-1_800x.jpg?v=1651056480", "photos": ["https://cdn.shopify.com/s/files/1/2728/6638/products/gbt-27082-57014-f-i-1_800x.jpg?v=1651056480", "https://cdn.shopify.com/s/files/1/0007/5769/4579/products/gbt-27082-57014-f-b-1.jpg?v=1638178567", "https://cdn.shopify.com/s/files/1/0007/5769/4579/products/gbt-27082-57014-f-d-1.jpg?v=1638178567"], "slug": "fester",  "color": "Brown","sizes": ["8", "9"]},
        { "id": 18, "name": "Pixel", "brand": "HUSHPUPPIES", "gender": "MEN", "category": "FORMAL", "price": 75, "is_in_inventory": true, "items_left": 7, "imageURL": "https://www.styletread.com.au/media/catalog/product/cache/c36a32b6d66d14559eea2ad6988106fc/H/P/HP10105BLALE_2.jpg", "photos": ["https://www.styletread.com.au/media/catalog/product/cache/c36a32b6d66d14559eea2ad6988106fc/H/P/HP10105BLALE_2.jpg", "http://t3.gstatic.com/images?q=tbn:ANd9GcS_8eMY1-OEu5Dsfr5icCFfUfgeWHWuoX4ZlcJyeiP5sB97GPfb", "http://t0.gstatic.com/images?q=tbn:ANd9GcSpEwlbW84alll1Xx4-LeqcK1MkV1JJAkFAzGt90yyolRGPsRQD"], "slug": "pixel",  "color": "Black","sizes": ["8", "9"]},
        { "id": 19, "name": "Austin", "brand": "HUSHPUPPIES", "gender": "MEN", "category": "FORMAL", "price": 75, "is_in_inventory": true, "items_left": 2, "imageURL": "https://cdn.shopify.com/s/files/1/0016/0074/9623/products/Austin-Coffee_800x800.jpg?v=1574772988", "photos": ["https://cdn.shopify.com/s/files/1/0016/0074/9623/products/Austin-Coffee_800x800.jpg?v=1574772988", "https://i.etsystatic.com/22065492/r/il/6c9422/2876332145/il_794xN.2876332145_8edt.jpg", "https://i.etsystatic.com/22065492/r/il/aac97e/2828666466/il_1140xN.2828666466_lyw4.jpg"], "slug": "austin",  "color": "Brown","sizes": ["8", "9"]},
        { "id": 20, "name": "SS-HL-0135", "brand": "HUSHPUPPIES", "gender": "WOMEN", "category": "FORMAL", "price": 30, "is_in_inventory": true, "items_left": 6, "imageURL": "https://cdn.shopify.com/s/files/1/0016/0074/9623/products/009240000-11-SS-HL-0135-Black_800x800.jpg?v=1572264270", "photos": ["https://cdn.shopify.com/s/files/1/0016/0074/9623/products/009240000-11-SS-HL-0135-Black_800x800.jpg?v=1572264270", "https://cdn.shopify.com/s/files/1/0016/0074/9623/products/009240000-484_2.jpg?v=1614841436", "https://cdn.shopify.com/s/files/1/0016/0074/9623/products/009240000-484_5.jpg?v=1614841436"], "slug": "ss-hl-0135",  "color": "Black","sizes": ["8", "9"]},
        { "id": 21, "name": "SS-HL-0136", "brand": "HUSHPUPPIES", "gender": "WOMEN", "category": "FORMAL", "price": 50, "is_in_inventory": true, "items_left": 4, "imageURL": "https://cdn.shopify.com/s/files/1/0016/0074/9623/products/009250000-779-SS-HL-0136-Coffee_800x800.jpg?v=1571900372", "photos": ["https://cdn.shopify.com/s/files/1/0016/0074/9623/products/009250000-779-SS-HL-0136-Coffee_800x800.jpg?v=1571900372", "https://m.media-amazon.com/images/I/816crtxsCoL._AC_SL1500_.jpg"], "slug": "ss-hl-0136",  "color": "White","sizes": ["8", "9"]},
        { "id": 22, "name": "SS-HL-0128", "brand": "HUSHPUPPIES", "gender": "WOMEN", "category": "FORMAL", "price": 35, "is_in_inventory": true, "items_left": 3, "imageURL": "https://cdn.shopify.com/s/files/1/0016/0074/9623/products/000300242-484-SS-HL-0128-Blue_800x800.jpg?v=1583235174", "photos": ["https://cdn.shopify.com/s/files/1/0016/0074/9623/products/000300242-484-SS-HL-0128-Blue_800x800.jpg?v=1583235174", "https://cdn11.bigcommerce.com/s-ykl5k7ha1u/images/stencil/728x728/products/1447/10200/Clarks-Laina85-Trim-Blue-Suede-26169095-0e__96920.1658827591.jpg?c=1", "https://cdn11.bigcommerce.com/s-ykl5k7ha1u/images/stencil/1280x1280/products/1447/10204/Clarks-Laina85-Trim-Blue-Suede-26169095-0f__93054.1658827596.jpg?c=1?imbypass=on"], "slug": "ss-hl-0128",  "color": "Blue","sizes": ["8", "9"]},
        { "id": 24, "name": "SS-MS-0075", "brand": "HUSHPUPPIES", "gender": "WOMEN", "category": "CASUAL", "price": 35, "is_in_inventory": true, "items_left": 4, "imageURL": "https://cdn.shopify.com/s/files/1/0016/0074/9623/products/009170000-615-SS-MS-0075-TAN_800x800.jpg?v=1570688687", "photos": ["https://cdn.shopify.com/s/files/1/0016/0074/9623/products/009170000-615-SS-MS-0075-TAN_800x800.jpg?v=1570688687", "https://m.media-amazon.com/images/I/61jitbJJW-L._UY575_.jpg", "https://m.media-amazon.com/images/I/71tcBCaEeyL._UY575_.jpg"], "slug": "ss-ms-0075",  "color": "Brown","sizes": ["8", "9"]},
        { "id": 25, "name": "SS-PM-0093", "brand": "HUSHPUPPIES", "gender": "WOMEN", "category": "CASUAL", "price": 30, "is_in_inventory": true, "items_left": 3, "imageURL": "https://cdn.shopify.com/s/files/1/0016/0074/9623/products/SS-PM-0093_1_800x800.jpg?v=1570601253", "photos": ["https://cdn.shopify.com/s/files/1/0016/0074/9623/products/SS-PM-0093_1_800x800.jpg?v=1570601253", "https://m.media-amazon.com/images/I/71TQ--B6JgL._UL1500_.jpg"], "slug": "ss-pm-0093",  "color": "Brown","sizes": ["8", "9"]},
        { "id": 26, "name": "Nizza X Disney", "brand": "ADIDAS", "gender": "KIDS", "category": "CASUAL", "price": 55, "is_in_inventory": true, "items_left": 6, "imageURL": "https://assets.adidas.com/images/h_320,f_auto,q_auto:sensitive,fl_lossy/ef901c7aeac042578eceab9d0159196c_9366/Nizza_x_Disney_Sport_Goofy_Shoes_White_FW0651_01_standard.jpg", "photos": ["https://assets.adidas.com/images/h_320,f_auto,q_auto:sensitive,fl_lossy/ef901c7aeac042578eceab9d0159196c_9366/Nizza_x_Disney_Sport_Goofy_Shoes_White_FW0651_01_standard.jpg", "https://media.endclothing.com/media/f_auto,q_auto:eco,w_768/prodmedia/media/catalog/product/1/5/15-07-2020_FW0645_m1_1.jpg", "https://media.endclothing.com/media/f_auto,q_auto:eco,w_768/prodmedia/media/catalog/product/1/5/15-07-2020_FW0645_3_1.jpg"], "slug": "nizza-x-disney","color": "White","sizes": ["8", "9"]},
        { "id": 27, "name": "X_PLR", "brand": "ADIDAS", "gender": "KIDS", "category": "CASUAL", "price": 65, "is_in_inventory": true, "items_left": 5, "imageURL": "https://assets.adidas.com/images/h_320,f_auto,q_auto:sensitive,fl_lossy/a36518227134495da766ab9d01772fa2_9366/X_PLR_Shoes_Red_FY9063_01_standard.jpg", "photos": ["https://assets.adidas.com/images/h_320,f_auto,q_auto:sensitive,fl_lossy/a36518227134495da766ab9d01772fa2_9366/X_PLR_Shoes_Red_FY9063_01_standard.jpg", "https://media.endclothing.com/media/f_auto,q_auto:eco,w_768/prodmedia/media/catalog/product/2/4/24-01-2020_adidas_ultraboost20_scarlet_red_eg0700_jd_1.jpg" ,"https://media.endclothing.com/media/f_auto,q_auto:eco,w_768/prodmedia/media/catalog/product/2/4/24-01-2020_adidas_ultraboost20_scarlet_red_eg0700_jd_3.jpg"], "slug": "x_plr",  "color": "Red","sizes": ["8", "9"]},
        { "id": 28, "name": "Stan Smith", "brand": "ADIDAS", "gender": "KIDS", "category": "CASUAL", "price": 55, "is_in_inventory": true, "items_left": 3, "imageURL": "https://assets.adidas.com/images/h_320,f_auto,q_auto:sensitive,fl_lossy/d0720712d81e42b1b30fa80800826447_9366/Stan_Smith_Shoes_White_M20607_M20607_01_standard.jpg", "photos": ["https://assets.adidas.com/images/h_320,f_auto,q_auto:sensitive,fl_lossy/d0720712d81e42b1b30fa80800826447_9366/Stan_Smith_Shoes_White_M20607_01_standard.jpg", "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/1077f069d94646798f93ac72011ddcce_9366/Stan_Smith_Shoes_White_FX7524_02_standard_hover.jpg", "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/c5a377b40b2e4a3eb48eac72011de682_9366/Stan_Smith_Shoes_White_FX7524_04_standard.jpg"], "slug": "stan-smith",  "color": "White","sizes": ["8", "9"]},
        { "id": 29, "name": "NMD_R1", "brand": "ADIDAS", "gender": "KIDS", "category": "RUNNING", "price": 120, "is_in_inventory": true, "items_left": 3, "imageURL": "https://assets.adidas.com/images/h_320,f_auto,q_auto:sensitive,fl_lossy/99ca762cb9054caf82fbabc500fd146e_9366/NMD_R1_Shoes_Blue_FY9392_01_standard.jpg", "photos": ["https://assets.adidas.com/images/h_320,f_auto,q_auto:sensitive,fl_lossy/99ca762cb9054caf82fbabc500fd146e_9366/NMD_R1_Shoes_Blue_FY9392_01_standard.jpg", "https://images.bonanzastatic.com/afu/images/8624/dd95/7e40_12254003540/__12.jpg", "https://images.bonanzastatic.com/afu/images/e240/e512/91fa_12254003619/__12.jpg"], "slug": "nmd_r1",  "color": "Blue","sizes": ["8", "9"]},
        { "id": 30, "name": "NMD_R1 Flash Red", "brand": "ADIDAS", "gender": "WOMEN", "category": "CASUAL", "price": 140, "is_in_inventory": true, "items_left": 5, "imageURL": "https://assets.adidas.com/images/h_320,f_auto,q_auto:sensitive,fl_lossy/90f85768e3894aeaab67aba0014a3379_9366/NMD_R1_Shoes_Red_FY9389_01_standard.jpg", "photos": ["https://assets.adidas.com/images/h_320,f_auto,q_auto:sensitive,fl_lossy/90f85768e3894aeaab67aba0014a3379_9366/NMD_R1_Shoes_Red_FY9389_01_standard.jpg", "https://cdn.shopify.com/s/files/1/0603/3031/1875/products/2_1e8377db-4248-45d7-946b-ebcdb3b5bdf8_540x.jpg?v=1656197917", "https://cdn.shopify.com/s/files/1/0603/3031/1875/products/3_f69b9f2a-e2d2-4eb6-93a1-cb860a359526_540x.jpg?v=1656197917"], "slug": "nmd_r1-flash-red",  "color": "Red","sizes": ["8", "9"]},
        { "id": 31, "name": "Superstar", "brand": "ADIDAS", "gender": "WOMEN", "category": "CASUAL", "price": 90, "is_in_inventory": true, "items_left": 3, "imageURL": "https://assets.adidas.com/images/h_320,f_auto,q_auto:sensitive,fl_lossy/12365dbc7c424288b7cdab4900dc7099_9366/Superstar_Shoes_White_FW3553_FW3553_01_standard.jpg", "photos": ["https://assets.adidas.com/images/h_320,f_auto,q_auto:sensitive,fl_lossy/12365dbc7c424288b7cdab4900dc7099_9366/Superstar_Shoes_White_FW3553_FW3553_01_standard.jpg", "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/1617fba1ee35467eb3e6ab4900dc8294_9366/Superstar_Shoes_White_FW3553_02_standard_hover.jpg"], "slug": "superstar",  "color": "White","sizes": ["8", "9"]},
        { "id": 32, "name": "Club C Revenge Mens", "brand": "Reebok", "gender": "MEN", "category": "CASUAL", "price": 70, "is_in_inventory": true, "items_left": 3, "imageURL": "https://assets.reebok.com/images/h_840,f_auto,q_auto:sensitive,fl_lossy/7599294868804d78a1b1ab6f01718a5e_9366/Club_C_Revenge_Men's_Shoes_White_FV9877_01_standard.jpg", "photos": ["https://assets.reebok.com/images/h_840,f_auto,q_auto:sensitive,fl_lossy/7599294868804d78a1b1ab6f01718a5e_9366/Club_C_Revenge_Men's_Shoes_White_FV9877_01_standard.jpg", "https://assets.reebok.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/ce44b1ca51fa48ae8236afa100fc19a1_9366/BB_4000_II_Shoes_White_ID7342_03_standard.jpg", "https://assets.reebok.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/1170d00946944a6592b1afa100fc35ba_9366/BB_4000_II_Shoes_White_ID7342_04_standard.jpg"], "slug": "club-c-revenge-mens",  "color": "White","sizes": ["8", "9"]},
        { "id": 33, "name": "SK80-Low", "brand": "Vans", "gender": "MEN", "category": "CASUAL", "price": 60, "is_in_inventory": true, "items_left": 3, "imageURL": "https://images.vans.com/is/image/Vans/UUK24I-HERO?$583x583$", "photos": ["https://images.vans.com/is/image/Vans/UUK24I-HERO?$583x583$", "http://t2.gstatic.com/images?q=tbn:ANd9GcQTEueepUblEhLvoO9ot8CNn4fFXvEuFdwSf7UP6HDADRu3I6nv", "https://images.journeys.com/images/products/1_665804_ZM_ALT5.JPG"], "slug": "sk80-low", "color": "White","sizes": ["8", "9"] },
        { "id": 34, "name": "Michael Feburary SK8-Hi", "brand": "Vans", "gender": "MEN", "category": "CASUAL", "price": 72, "is_in_inventory": true, "items_left": 3, "imageURL": "https://images.vans.com/is/image/Vans/MV122M-HERO?$583x583$", "photos": ["https://images.vans.com/is/image/Vans/MV122M-HERO?$583x583$", "https://di2ponv0v5otw.cloudfront.net/posts/2021/03/11/604aa9cf09d76044a49c62d0/m_604aae26ae766f03d5ac5263.jpg", "https://di2ponv0v5otw.cloudfront.net/posts/2021/03/11/604aa9cf09d76044a49c62d0/m_604aae27284e995f54dbc131.jpg"], "slug": "michael-feburary-sk8-hi", "color": "Black","sizes": ["8", "9"]}
    ]

// read all records
router.get(`/cars`, (req, res) => {
    //user does not have to be logged in to see car details
    carsModel.find((error, data) => {
        res.json(data)
    })
})


// Read one record
router.get(`/cars/:id`, (req, res) => {
       
            carsModel.findById(req.params.id, (error, data) => {
                res.json(data)
            })
        
    })



// router.post(`/cars`, (req, res) =>
// {
//     console.log(req.body.pointers[0])
//     if (req.body.name === "") {
//         res.json({errorMessage: `name cant be empty`});
//     } else if (Object.keys(req.body.tags).length === 0 && Object.keys(req.body.tags).length === undefined) {
//         res.json({errorMessage: `mus select at least one tag`});
//     } else if (Object.keys(req.body.address['addressRegion']).length === 0 && Object.keys(req.body.address['addressRegion']).length === undefined) {
//         res.json({errorMessage: `mus select at least one county`});
//     } else if (Object.keys(req.body.address['addressLocality']).length === 0 && Object.keys(req.body.address['addressLocality']).length === undefined) {
//         res.json({errorMessage: `mus select at least one town`});
//     } else if (!/^0\d{7,12}$/.test(req.body.telephone))
//     {
//         res.json({errorMessage: `telephone format must be 0 followed by 9 digit`});
//     } else if (!/^\s*(-?\d+(\.\d+)?)\s*$/.test(req.body.pointers[0]))
//     {

//         res.json({errorMessage: `enter between -90 to 90`});
//     } else if (!/^\s*(-?\d+(\.\d+)?)\s*$/.test(req.body.pointers[1]))
//     {
//         res.json({errorMessage: `enter between -180 to 180`});
//     } else {
//         carsModel.findOne({name: req.params.name}, (uniqueError, uniqueData) =>
//         {
//             if (uniqueData)
//             {
//                 res.json({errorMessage: `Attraction already exists`})
//             } else
//             {
//                 carsModel.create(req.body, (error, data) => {
//                     console.log(req.body)
//                     res.json(data)
//                 })
//             }
//         })
//     }
// })

// Add new record
// router.post(`/cars`, (req, res) => {
//     jwt.verify(req.headers.authorization,JWT_PRIVATE_KEY, { algorithm: "HS256" }, (err, decodedToken) => {
//         if (err) {
//             res.json({ errorMessage: `User is not logged in` })
//         }
//         else {
//             //|| !/^[a-zA-Z]+$/.test(req.body.name)
//             //^(0*[1-9][0-9]*(\.[0-9]+)?|0+\.[0-9]*[1-9][0-9]*)$
//             //\s+\d{1,6}\s+
//             if (decodedToken.accessLevel >= process.env.ACCESS_LEVEL_ADMIN) {
//                 if (req.body.name == "") {
//                     res.json({ errorMessage: `name cant be empty` });
//                 } else if (req.body.brand == "") {
//                     res.json({ errorMessage: `brand cant be empty` });
//                 } else if (req.body.gender == "") {
//                     res.json({ errorMessage: `select gender` });
//                 } else if (req.body.category == "") {
//                     res.json({ errorMessage: `select a category` });
//                 }
//                 else if (!/^(0*[1-9][0-9]*(\.[0-9]+)?|0+\.[0-9]*[1-9][0-9]*)$/.test(req.body.price)) {
//                     console.log(req.body.price)
//                     res.json({ errorMessage: `price must be above 0` });
//                 } else if (!/^[0-9]{1,6}$/.test(req.body.items_left)) {
//                     console.log(req.body.items_left)
//                     res.json({ errorMessage: `no decimal and negative numbers allowed` });
//                 }
//                 else {
//                     // Use the new car details to create a new car document
//                     carsModel.create(req.body, (error, data) => {
//                         res.json(data)
//                     })
//                 }
//             }
//             else {
//                 res.json({ errorMessage: `User is not an administrator, so they cannot add new records` })
//             }
//         }
//     })
// })

router.post(`/cars`, upload.array("shoePhotos", parseInt(process.env.MAX_NUMBER_OF_UPLOAD_FILES_ALLOWED)), (req, res) => {
    jwt.verify(req.headers.authorization, JWT_PRIVATE_KEY, { algorithm: "HS256" }, (err, decodedToken) => {
        if (err) {
            res.json({ errorMessage: `User is not logged in` })
        }
        else {
            if (decodedToken.accessLevel >= process.env.ACCESS_LEVEL_ADMIN) {
                if (req.body.name == "") {
                    res.json({ errorMessage: `name cant be empty` });
                } else if (req.body.brand == "") {
                    res.json({ errorMessage: `brand cant be empty` });
                } else if (req.body.gender == "") {
                    res.json({ errorMessage: `select gender` });
                } else if (req.body.category == "") {
                    res.json({ errorMessage: `select a category` });
                }
                else if (!/^(0*[1-9][0-9]*(\.[0-9]+)?|0+\.[0-9]*[1-9][0-9]*)$/.test(req.body.price)) {
                    console.log(req.body.price)
                    res.json({ errorMessage: `price must be above 0` });
                } else if (!/^[0-9]{1,6}$/.test(req.body.items_left)) {
                    console.log(req.body.items_left)
                    res.json({ errorMessage: `no decimal and negative numbers allowed` });
                }
                else {
                    let carDetails = new Object()

                    carDetails.name = req.body.name
                    carDetails.brand = req.body.brand
                    carDetails.gender = req.body.gender
                    carDetails.color = req.body.color
                    carDetails.price = req.body.price
                    carDetails.category = req.body.category
                    carDetails.sizes = Array.isArray(req.body.sizes) ? req.body.sizes : [req.body.sizes]
                    carDetails.items_left = req.body.items_left

                    // add the car's photos to the carDetails JSON object
                    carDetails.photos = []

                    req.files.map((file, index) => {
                        carDetails.photos[index] = { filename: `${file.filename}` }
                    })
                    console.log(carDetails)
                    carsModel.create(carDetails, (error, data) => {
                        res.json(data)
                    })
                }
            }
            else {
                res.json({ errorMessage: `User is not an administrator, so they cannot add new records` })
            }
        }
    })
})


// Update one record
router.put(`/cars/:id`, (req, res) => {
    jwt.verify(req.headers.authorization, JWT_PRIVATE_KEY, { algorithm: "HS256" }, (err, decodedToken) => {
        if (err) {
            res.json({ errorMessage: `User is not logged in` })
        }
        else {
            console.log(req.body)
            if (req.body.name == "") {
                res.json({ errorMessage: `name cant be empty` });
            } else if (req.body.brand == "") {
                res.json({ errorMessage: `brand cant be empty` });
            } else if (req.body.gender == "") {
                res.json({ errorMessage: `select gender` });
            } else if (req.body.category == "") {
                res.json({ errorMessage: `select a category` });
            }
            else if (!/^(0*[1-9][0-9]*(\.[0-9]+)?|0+\.[0-9]*[1-9][0-9]*)$/.test(req.body.price)) {
                console.log(req.body.price)
                res.json({ errorMessage: `price must be above 0` });
            } else if (!/^[0-9]{1,6}$/.test(req.body.items_left)) {
                console.log(req.body.items_left)
                res.json({ errorMessage: `no decimal and negative numbers allowed` });
            } else {
                carsModel.findByIdAndUpdate(req.params.id, { $set: req.body }, (error, data) => {
                    res.json(data)
                })
            }
        }
    })
})


// Delete one record
router.delete(`/cars/:id`, (req, res) => {
    jwt.verify(req.headers.authorization, JWT_PRIVATE_KEY, { algorithm: "HS256" }, (err, decodedToken) => {
        if (err) {
            res.json({ errorMessage: `User is not logged in` })
        }
        else {
            if (decodedToken.accessLevel >= process.env.ACCESS_LEVEL_ADMIN) {
                carsModel.findByIdAndRemove(req.params.id, (error, data) => {
                    res.json(data)
                })
            }
            else {
                res.json({ errorMessage: `User is not an administrator, so they cannot delete records` })
            }
        }
    })
})

router.get(`/reset`, (req, res) => {


    carsModel.deleteMany({}, (error, data) => {
    })

    shoes.map(shoe => {

        // console.log(shoe)
        carsModel.create(shoe, (error, data) => {

        })
    })

})

module.exports = router
