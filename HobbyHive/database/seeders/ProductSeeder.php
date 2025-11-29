<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Product;
use App\Models\Category;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Product::truncate(); // Clears the table before seeding, avoids duplicates
        
        // ensure categories exist and build name => id map
        $categories = Category::all()->pluck('id', 'name')->toArray();

        $products = [
            //all- show all
            //Seasonal
            [
                'name' => 'Christmas Craft Set',
                'description' => 'Everything you need for festive holiday crafts.',
                'price' => 30.00,
                'sale_price' => 25.00,
                'category' => 'Seasonal',
                'image_url' => 'images/christmas-craft-set.webp',
                //image source: https://www.amazon.co.uk/Baker-Ross-FX811-Christmas-Bumper/dp/B0CGM3P3R9/ref=sr_1_6?adgrpid=1179776875610135&dib=eyJ2IjoiMSJ9.6BB92wh5bGBlUc-eIxG1FDon5Vz36AftaBO-mokb5dctUokds9cagdv2Za85roWB4qsK7LFUXZErEtFBEN1ICu2796FBa9RQ52e_8P1G6hDmaF9-Yj2fP7la9YyZzkB1Q8jp_ypf4usTUaW8893V0_kpKA93xJ60Mua0_4yJKCXLknld3vC2KFWhjFeRuLIDcb8XhES3oRG4pTyrnXQAsjJ-n-p7-x9IZFaOv1MYPm5LphPg-kJ7hSnjtjJZe7XhMrb1aZY3G8ANrfi21d8jBtTXgAUkJGkKgfgZ9ltoGz0.fkp7rtirWHLQN6TjUZdpUzjR5eFpN4jvXhZBY7IEJXc&dib_tag=se&hvadid=73736332990968&hvbmt=be&hvdev=c&hvlocphy=40860&hvnetw=o&hvqmt=e&hvtargid=kwd-73736191608267%3Aloc-188&hydadcr=18508_2413248&keywords=craft+christmas+kit&mcid=743adff418313583a881bb6ac28642e7&msclkid=cf3a944b14e613ff4311fd6133ce750c&qid=1764370219&sr=8-6
                'stock_quantity' => 20,
            ],
            [
                'name' => 'Easter Egg Decorating Kit',
                'description' => 'Fun kit for decorating Easter eggs with vibrant colors.',
                'price' => 15.00,
                'sale_price' => 12.00,
                'category' => 'Seasonal',
                'image_url' => 'images/easter-egg-decorating-kit.webp',
                //image source: https://www.bing.com/images/search?view=detailV2&ccid=2TU5J8QT&id=176056E1341045470C971858F34860E10EA574F6&thid=OIP.2TU5J8QT8EeCE6YxbW8nugHaHa&mediaurl=https%3a%2f%2fi5.walmartimages.com%2fseo%2fEaster-Egg-Decorating-Kit-with-6-Colorful-Eggs-and-Markers-Fun-DIY-Craft-Activity-for-Kids-and-Families_cf2b3537-a7e7-490c-b659-ef29f5e3a83f.7b07ad58777c879e8b463d293060d3b3.jpeg&cdnurl=https%3a%2f%2fth.bing.com%2fth%2fid%2fR.d9353927c413f0478213a6316d6f27ba%3frik%3d9nSlDuFgSPNYGA%26pid%3dImgRaw%26r%3d0&exph=1600&expw=1600&q=easter+egg+decorating+kit&FORM=IRPRST&ck=6DEFA9F76F2F3B4AB83869F60C78EDFB&selectedIndex=1&itb=0
                'stock_quantity' => 35,
            ],
            [
                'name' => 'Halloween Craft Bundle',
                'description' => 'Create spooky decorations with this Halloween craft bundle.',
                'price' => 10.00,
                'sale_price' => 10.00,
                'category' => 'Seasonal',
                'image_url' => 'images/halloween-craft-bundle.webp',
                //image source: https://www.bing.com/images/search?view=detailV2&ccid=uKFGlRQF&id=C915BDAEFFB92BBB4DE876519A6BD8299FFD9AE1&thid=OIP.uKFGlRQF7Jqi9QNIzsrOJQHaHa&mediaurl=https%3a%2f%2fth.bing.com%2fth%2fid%2fR.b8a146951405ec9aa2f50348cecace25%3frik%3d4Zr9nynYa5pRdg%26riu%3dhttp%253a%252f%252fwww.funbox.com.au%252fcdn%252fshop%252ffiles%252f2023-Aug-1315_HalloweenCraftActivityBundle_1200x1200.jpg%253fv%253d1693535139%26ehk%3dgfaWzSZWlOt1lvIpY%252f4%252f%252baxcnS6UOmrautLrDOntdBI%253d%26risl%3d%26pid%3dImgRaw%26r%3d0&exph=1200&expw=1200&q=halloween+craft+bundle&FORM=IRPRST&ck=7E7F968E4D4CD8996CC9AEBD0F794708&selectedIndex=0&itb=0
                'stock_quantity' => 18,
            ],
            //new

            // art supplies
            [
                'name' => '100 Brush Markers Set',
                'description' => 'Vibrant colours for all your art projects.',
                'price' => 25.00,
                'sale_price' => 25.00,
                'category' => 'Art Supplies',
                'image_url' => 'images/brushmarkers.jpg',
                //image source: https://www.amazon.co.uk/Deco-Time-Alcohol-Markers-Stackable/dp/B0DZD3ZZ4B/ref=asc_df_B0DZD3ZZ4B?tag=bingshoppinga-21&linkCode=df0&hvadid=80814311048586&hvnetw=o&hvqmt=e&hvbmt=be&hvdev=c&hvlocint=&hvlocphy=40860&hvtargid=pla-4584413781660337&msclkid=1da008adfc451ca4a7c86187e916cac2&th=1
                'stock_quantity' => 12,
            ],
            [
                'name' => '15 Paint Brush Set',
                'description' => 'High-quality brushes for acrylic and watercolor painting.',
                'price' => 14.50,
                'sale_price' => 14.50,
                'category' => 'Art Supplies',
                'image_url' => 'images/paint-brush-set-15.webp',
                //image source: https://www.bing.com/images/search?view=detailV2&ccid=FD0wsC2R&id=47F3AEFA8614EBD81DEB1D8284A5656F360D26BF&thid=OIP.FD0wsC2RFoDxJKwFa_6N8gHaHh&mediaurl=https%3a%2f%2fimages-na.ssl-images-amazon.com%2fimages%2fI%2f81Oa7KpmgwL._AC_SL1500_.jpg&cdnurl=https%3a%2f%2fth.bing.com%2fth%2fid%2fR.143d30b02d911680f124ac056bfe8df2%3frik%3dvyYNNm9lpYSCHQ%26pid%3dImgRaw%26r%3d0&exph=1480&expw=1456&q=paint+brushes&FORM=IRPRST&ck=9694B4577B69ACD20034513A4CABE438&selectedIndex=0&itb=0
                'stock_quantity' => 40,
            ],
            [
                'name' => 'Watercolor Pans Set - 36 Colors',
                'description' => 'Professional-grade watercolors for artists of all levels.',
                'price' => 20.30,
                'sale_price' => 18.00,
                'category' => 'Art Supplies',
                'image_url' => 'images/watercolour-pans-set-36-pieces.webp',
                //image source: https://www.hobbycraft.co.uk/watercolour-pans-set-36-pieces/6475991000.html
                'stock_quantity' => 27,
            ],
            //Toys & Games
            [
                'name' => 'Wooden Jigsaw Puzzle - 500 Pieces',
                'description' => 'Challenging and fun puzzle for all ages.',
                'price' => 22.00,
                'sale_price' => 19.80,
                'category' => 'Toys & Games',
                'image_url' => 'images/jigsaw-puzzle.jpg',
                //image source: https://www.downtownstores.co.uk/ravensburger-under-the-sea-wooden-jigsaw-puzzle-500-pieces/p58989
                'stock_quantity' => 15,
            ],
            [
                'name' => 'Building Blocks Set - 200 Pieces',
                'description' => 'Encourages creativity and fine motor skills.',
                'price' => 30.00,
                'sale_price' => 27.00,
                'category' => 'Toys & Games',
                'image_url' => 'images/building-blocks.jpg',
                //image source: https://www.istockphoto.com/photo/toy-cubes-full-frame-background-gm157739628-21430039?searchscope=image%2Cfilm
                'stock_quantity' => 22,
            ],
            [
                'name' => 'Nature Plush Toys - Set of 5',
                'description' => 'Soft and cuddly plush toys inspired by nature.',
                'price' => 12.50,
                'sale_price' => 12.50,
                'category' => 'Toys & Games',
                'image_url' => 'images/nature-plush-toys.webp',
                //image source: https://www.hobbycraft.co.uk/assorted-nature-buddies-wildlife-plush-toy/6623721000.html
                'stock_quantity' => 40,
            ],
            // textile crafts
            [
                'name' => 'Sewing Machine',
                'description' => 'Perfect for beginners and advanced sewers alike.',
                'price' => 300.00,
                'sale_price' => 300.00,
                'category' => 'Textile Crafts',
                'image_url' => 'images/sewing-machine.jpg',
                //image source: https://www.istockphoto.com/photo/close-up-of-sewing-machine-on-white-background-gm953135818-9953135818?searchscope=image%2Cfilm
                'stock_quantity' => 18,
            ],
            [
                'name' => 'Thread Set - 27 Spools',
                'description' => 'A variety of colors for all your sewing projects.',
                'price' => 12.00,
                'sale_price' => 10.50,
                'category' => 'Textile Crafts',
                'image_url' => 'images/thread-set-27-10.webp',
                //image source: https://www.hobbycraft.co.uk/spool-thread-set-100m-27-pack/6619261000.html
                'stock_quantity' => 62,
            ],
            [
                'name' => 'Fabric Scissors',
                'description' => 'Sharp scissors designed specifically for cutting fabric.',
                'price' => 10.00,
                'sale_price' => 10.00,
                'category' => 'Textile Crafts',
                'image_url' => 'images/fabric-scissors.webp',
                //image source: https://www.hobbycraft.co.uk/soft-grip-fabric-scissors-25cm/6608181000.html
                'stock_quantity' => 30,
            ],
            // books
            [
                'name' => 'Knitting for Beginners: The Ultimate Guide to Knitting - By Charlotte White',
                'description' => 'Learn How to Knit and Create Amazing Projects Following Useful Techniques and Patterns',
                'price' => 18.00,
                'sale_price' => 15.00,
                'category' => 'Books',
                'image_url' => 'images/knitting-for-beginners.jpg',
                //image sources: https://www.goodreads.com/en/book/show/53533539-knitting-for-beginners
                'stock_quantity' => 25,
            ],
            [
                'name' => 'DIY Notebook',
                'description' => 'All My DIY Projects To Do Lined Journal, Useful, Funny DIY Gift, The Perfect Novelty DIY Gift for Someone Moving Home or who Loves DIY & Home Improvement - Lined & Graph Pages ',
                'price' => 14.50,
                'sale_price' => 14.00,
                'category' => 'Books',
                'image_url' => 'images/diy-book.jpg',
                //image source: https://www.amazon.co.uk/DIY-Notebook-Projects-Journal-Improvement/dp/B0B9QPQDPZ/ref=sr_1_4?crid=70SNDVEI5OTG&dib=eyJ2IjoiMSJ9.KALuA5YbmJMSOg9ndEnu2ezWhZ1cICuJmNduBvFvYCCz5qoICWCzdS6jDUOvgvYnmrOQldmpvLIQPKAI3BAxcuioMM9xIu6sL7Rn1qqUF4UMrhdftraiNoCDFmimXJIM3CB7-_UJCQA1FyAtbuXkrg4fmR8yn861JsRRHXVE3cATGnzibmDeeH9nj4UA1AJkOqXUz7aunijRYOph0MvEC9vnhIvP9Z8enbFO6MeF_7g.728fF7TJnnLo9mYL3ChTfLGApV19xHCWjHzB7I1PRqo&dib_tag=se&keywords=DIY&qid=1764371759&s=books&sprefix=diy%2Cstripbooks%2C76&sr=1-4
                'stock_quantity' => 14,
            ],
            [
                'name' => 'The Origami Book for Kids',
                'description' => 'A full-color paper craft book with over 40 beautiful and easy Origami.',
                'price' => 11.75,
                'sale_price' => 11.75,
                'category' => 'Books',
                'image_url' => 'images/origami-book.jpg',
                //image source: https://www.amazon.co.uk/Origami-Book-Kids-full-color-instructions/dp/3989291718/ref=sr_1_1_sspa?crid=3ESLR52336X4V&dib=eyJ2IjoiMSJ9.qoDxG4Fz9PH5m76gSiubNMA5HruthtUNx4b9roMMhEzuGDjl9pM1sU20-U_d-ManQEMHhHaZQOnqBJ2-2XSJTQ_BwGvlDH4zv0IJdwbE-vqCF6HEYcqyjYvcD-7r7151s9yfQuXWXXBL0Z4aHF8Mplvf6rAw5FugeEZ-PnhcX3CTbYnEafgZck7TdFIBtEl8V9I3o8RwMjikwYzpi1ydssJIH9Fa4R7X5eb8gXGBpzY.4YmIbdFK6Dz-Z6yblYlEpK05ysHDs-G7lS2O1dWwTlE&dib_tag=se&keywords=origami&qid=1764371935&s=books&sprefix=origam%2Cstripbooks%2C73&sr=1-1-spons&aref=I1Khcw8Xpw&sp_csd=d2lkZ2V0TmFtZT1zcF9hdGY&psc=1
                'stock_quantity' => 33,
            ],
            //Offers
            [
                'name' => 'Christmas Craft Set',
                'description' => 'Everything you need for festive holiday crafts.',
                'price' => 30.00,
                'sale_price' => 25.00,
                'category' => 'Seasonal',
                'image_url' => 'images/christmas-craft-set.webp',
                //image source: https://www.amazon.co.uk/Baker-Ross-FX811-Christmas-Bumper/dp/B0CGM3P3R9/ref=sr_1_6?adgrpid=1179776875610135&dib=eyJ2IjoiMSJ9.6BB92wh5bGBlUc-eIxG1FDon5Vz36AftaBO-mokb5dctUokds9cagdv2Za85roWB4qsK7LFUXZErEtFBEN1ICu2796FBa9RQ52e_8P1G6hDmaF9-Yj2fP7la9YyZzkB1Q8jp_ypf4usTUaW8893V0_kpKA93xJ60Mua0_4yJKCXLknld3vC2KFWhjFeRuLIDcb8XhES3oRG4pTyrnXQAsjJ-n-p7-x9IZFaOv1MYPm5LphPg-kJ7hSnjtjJZe7XhMrb1aZY3G8ANrfi21d8jBtTXgAUkJGkKgfgZ9ltoGz0.fkp7rtirWHLQN6TjUZdpUzjR5eFpN4jvXhZBY7IEJXc&dib_tag=se&hvadid=73736332990968&hvbmt=be&hvdev=c&hvlocphy=40860&hvnetw=o&hvqmt=e&hvtargid=kwd-73736191608267%3Aloc-188&hydadcr=18508_2413248&keywords=craft+christmas+kit&mcid=743adff418313583a881bb6ac28642e7&msclkid=cf3a944b14e613ff4311fd6133ce750c&qid=1764370219&sr=8-6
                'stock_quantity' => 20,
            ],
            [
                'name' => 'Building Blocks Set - 200 Pieces',
                'description' => 'Encourages creativity and fine motor skills.',
                'price' => 30.00,
                'sale_price' => 27.00,
                'category' => 'Toys & Games',
                'image_url' => 'images/building-blocks.jpg',
                //image source: https://www.istockphoto.com/photo/toy-cubes-full-frame-background-gm157739628-21430039?searchscope=image%2Cfilm
                'stock_quantity' => 22,
            ],
            [
            'name' => 'Easter Egg Decorating Kit',
                'description' => 'Fun kit for decorating Easter eggs with vibrant colors.',
                'price' => 15.00,
                'sale_price' => 12.00,
                'category' => 'Seasonal',
                'image_url' => 'images/easter-egg-decorating-kit.webp',
                //image source: https://www.bing.com/images/search?view=detailV2&ccid=2TU5J8QT&id=176056E1341045470C971858F34860E10EA574F6&thid=OIP.2TU5J8QT8EeCE6YxbW8nugHaHa&mediaurl=https%3a%2f%2fi5.walmartimages.com%2fseo%2fEaster-Egg-Decorating-Kit-with-6-Colorful-Eggs-and-Markers-Fun-DIY-Craft-Activity-for-Kids-and-Families_cf2b3537-a7e7-490c-b659-ef29f5e3a83f.7b07ad58777c879e8b463d293060d3b3.jpeg&cdnurl=https%3a%2f%2fth.bing.com%2fth%2fid%2fR.d9353927c413f0478213a6316d6f27ba%3frik%3d9nSlDuFgSPNYGA%26pid%3dImgRaw%26r%3d0&exph=1600&expw=1600&q=easter+egg+decorating+kit&FORM=IRPRST&ck=6DEFA9F76F2F3B4AB83869F60C78EDFB&selectedIndex=1&itb=0
                'stock_quantity' => 35,
            ]
        
        ];

        foreach ($products as $p) {
            // get or create category and obtain id
            $categoryId = $categories[$p['category']] ?? Category::firstOrCreate(['name' => $p['category']])->id;

            // prepare attributes for product
            $attrs = [
                'description' => $p['description'],
                'price' => $p['price'],
                'sale_price' => $p['sale_price'],
                'category_id' => $categoryId,
                'image_url' => $p['image_url'],
                'stock_quantity' => $p['stock_quantity'],
            ];

            // update existing by name or create new (prevents duplicates)
            Product::updateOrCreate(['name' => $p['name']], $attrs);
        }
    }
}
