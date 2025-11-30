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
                'name' => 'Christmas Colouring Book',
                'description' => 'Cozy Christmas Colouring book',
                'price' => 10.00,
                'sale_price' => 10.00,
                'category' => 'Seasonal',
                'image_url' => '/images/Christmas-colouring-book.png',
                'stock_quantity' => 20,
            ],
            [
                'name' => 'Christmas Baubles',
                'description' => 'Christmas Baubles Decoration kit',
                'price' => 7.99,
                'sale_price' => 7.99,
                'category' => 'Seasonal',
                'image_url' => '/images/Christmas-tree-bauble.png',
                'stock_quantity' => 35,
            ],
            [
                'name' => 'Mini Christmas Tree set',
                'description' => 'Fun Festive Decoration\nEasy to set up and easy to dress up  ',
                'price' => 10.00,
                'sale_price' => 10.00,
                'category' => 'Seasonal',
                'image_url' => '/images/Mini-christmas-tree.png',
                'stock_quantity' => 18,
            ],
            [
                'name' => 'Winter Wonderland Candle',
                'description' => 'Soft vanilla scent that is perfect for chilled cozy evenings. ',
                'price' => 6.99,
                'sale_price' => 6.99,
                'category' => 'Seasonal',
                'image_url' => '/images/Winter_Candle.png',
                'stock_quantity' => 7,
            ],
               [
                'name' => 'Ceramic Pumpkin Spice mug',
                'description' => 'Embrace the warmth and coziness of autumn with this personalized Pumpkin Spice gold handle ceramic mug.\n Comes with matching Coaster',
                'price' => 20.00,
                'sale_price' => 20.00,
                'category' => 'Seasonal',
                'image_url' => '/images/Pumpkin spice mug.png',
                'stock_quantity' => 18,
            ],

            //new
        [
                'name' => 'Acrylic Paint Set',
                'description' => 'Beginner friendly acrylic paint set.\n Comes with\n1x Canvas and easel\n4x paint brushes\n12x Acrylic Paints ',
                'price' => 20.00,
                'sale_price' => 20.00,
                'category' => 'new',
                'image_url' => '/images/Acylic-Pint set.png',
                'stock_quantity' => 40,
            ],
            [
                'name' => 'Pencil case',
                'description' => 'Multicolor pencil case',
                'price' => 4.99,
                'sale_price' => 4.99,
                'category' => 'new',
                'image_url' => '/images/Pencil-case.png',
                'stock_quantity' => 35,
            ],
            [
                'name' => 'Customizable Notebook ',
                'description' => 'Personalise your notebook with your own touch.',
                'price' => 8.99,
                'sale_price' => 8.99,
                'category' => 'new',
                'image_url' => '/images/Personalised-Floral-Notebook-pen.png',
                'stock_quantity' => 20,
            ],
            [
                'name' => 'Oil Paints',
                'description' => '5x oil paints.\n1x Colbalt Blue\n1x Yellow Ochre\n1x Viridian\n1x Cadmium Yellow\m1x Alizarin Crimson',
                'price' => 15.00,
                'sale_price' => 15.00,
                'category' => 'new',
                'image_url' => '/images/Artists_Oil_Paints.png',
                'stock_quantity' => 15,
            ],
               [
                'name' => 'Stationary Kit',
                'description' => 'Perfect back to school stationary set with all the essentialls',
                'price' => 9.99,
                'sale_price' => 9.99,
                'category' => 'new',
                'image_url' => '/images/School-kit.png',
                'stock_quantity' => 20,
            ],

            // art supplies
            [
                'name' => 'Acrylic Paint and Brush set',
                'description' => 'Fun, easy cleanup child friendly beginner paint set perfect for everyone.',
                'price' => 5.00,
                'sale_price' => 5.00,
                'category' => 'Art Supplies',
                'image_url' => '/images/Kids-paint-set .png',
                'stock_quantity' => 12,
            ],
            [
                'name' => 'Watercolor Palette',
                'description' => '£6 high quality waterColor paints in the a compact palette for easy use.',
                'price' => 15.00,
                'sale_price' => 15.00,
                'category' => 'Art Supplies',
                'image_url' => '/images/watercolour-set.png',
                'stock_quantity' => 40,
            ],
            [
                'name' => 'Faber-Castell Pencils 24 pack',
                'description' => 'Professional-grade Pencils',
                'price' => 25.00,
                'sale_price' => 30.00,
                'category' => 'Art Supplies', 'Offers',
                'image_url' => '/images/Faber Castell metal tin.png',
                'stock_quantity' => 27,
            ],
            [
                'name' => 'Paint Brush set',
                'description' => 'High quality paint brushes\nMade from natural fibers for perfect brush strokes. ',
                'price' => 15.00,
                'sale_price' => 15.00,
                'category' => 'Art Supplies',
                'image_url' => '/images/Paint-brush-set.png',
                'stock_quantity' => 30,
            ],
            [
                'name' => 'Sketchbook',
                'description' => 'A3 Sketchbook ideal for watercolor oil and acryilc',
                'price' => 5.00,
                'sale_price' => 5.00,
                'category' => 'Art Supplies',
                'image_url' => '/images/Sketchbook.png',
                'stock_quantity' => 30,
            ],
            //Toys & Games
            [
                'name' => 'Hasbro Gaming Monopoly',
                'description' => 'Strategy Board Game for 8+ Year Old Kids, 2-6 Players, Family Games for Children and Adults',
                'price' => 26.99,
                'sale_price' => 26.99,
                'category' => 'Toys & Games',
                'image_url' => 'images/jigsaw-puzzle.jpg',
                'stock_quantity' => 17,
            ],
            [
                'name' => 'Building Blocks Set - 200 Pieces',
                'description' => 'Encourages creativity and fine motor skills.',
                'price' => 10.99,
                'sale_price' => 10.99,
                'category' => 'Toys & Games',
                'image_url' => '/images/Jenga.png',
                'stock_quantity' => 20,
            ],
                 [
                'name' => 'Batman themed puzzle',
                'description' => 'Challenging and fun puzzle for all ages.',
                'price' => 12.99,
                'sale_price' => 12.99,
                'category' => 'Toys & Games',
                'image_url' => '/images/Batman-Jigsaw-Puzzle.png',
                'stock_quantity' => 25,
            ],
                 [
                'name' => 'Unicorn Plush ',
                'description' => 'Soft and cuddly plush toy',
                'price' => 10.99,
                'sale_price' => 10.99,
                'category' => 'Toys & Games',
                'image_url' => 'p/images/Unicorn-plushie.png',
                'stock_quantity' => 15,
            ],
            [
                'name' => 'Uno Deluxe',
                'description' => 'Classic Card Game for Kids and Adults for Family Game Night\n Use as a Travel Game or Engaging Gift for Kids\n2 to 10 Players',
                'price' => 15.99,
                'sale_price' => 15.99,
                'category' => 'Toys & Games',
                'image_url' => '/images/Uno.png',
                'stock_quantity' => 50,
            ],

            // textile crafts
            [
                'name' => 'Friendship Bracelet set',
                'description' => 'With this kit, you can create two vibrant friendship bracelets\n perfect for sharing with your best friend or a loved one',
                'price' => 7.00,
                'sale_price' => 7.00,
                'category' => 'Textile Crafts',
                'image_url' => '/images/Beads.png',
                'stock_quantity' => 10,
            ],
            [
                'name' => '3FT Cream Yarn',
                'description' => ' 3FT Yarn made from acrylic wool wool and natural fibers',
                'price' => 3.00,
                'sale_price' => 3.50,
                'category' => 'Textile Crafts',
                'image_url' => '/images/Yarn ball.png',
                'stock_quantity' => 62,
            ],
            [
                'name' => 'Circular Knitting Needles',
                'description' => '12mm Circular Knitting Kneedles perfect for large projects',
                'price' => 9.99,
                'sale_price' => 9.99,
                'category' => 'Textile Crafts',
                'image_url' => '/images/Circular-knitting-needles.png',
                'stock_quantity' => 20,
            ],
             [
                'name' => '12mm crochet Hook',
                'description' => '12mm Crochet Hook with removable Blue hand grip',
                'price' => 2.99,
                'sale_price' => 2.99,
                'category' => 'Textile Crafts',
                'image_url' => '/images/Crochet-Hook.png',
                'stock_quantity' => 13,
            ],
            [
                'name' => 'Jewellery Kit',
                'description' => 'DIY jewellry kit with over 100 beads and charms to choose from',
                'price' => 15.00,
                'sale_price' => 15.00,
                'category' => 'Textile Crafts',
                'image_url' => '/images/Jewellery kit.png',
                'stock_quantity' => 25,
            ],
            // books
            [
                'name' => 'The Lord of The Rings Book 1&2',
                'description' => 'Continuing the story begun in The Hobbit, this is the first two part of Tolkien’s epic masterpiece.\nThe Lord of the Rings features detailed map of Middle-earth and the beginning of a new journey.',
                'price' => 6.99,
                'sale_price' => 6.99,
                'category' => 'Books',
                'image_url' => '/images/Lord-of-the-rings.png',
                'stock_quantity' => 35,
            ],
            [
                'name' => 'Finn Family Moomintroll',
                'description' => 'Finn Family Moomintroll is the second book in the cult classic Moomin series by Tove Jansson.\nA must-read for adults and children alike.',
                'price' => 3.99,
                'sale_price' => 3.99,
                'category' => 'Books',
                'image_url' => '/images/Finn-Family-Moomintroll.png',
                'stock_quantity' => 12,
            ],
            [
                'name' => 'Alice\'s Adventures in Wonderland and Through the Looking Glass',
                'description' => 'Follow Alice down the rabbit hole in this enchanting work by Lewis Carrol',
                'price' => 14.99,
                'sale_price' => 14.99,
                'category' => 'Books',
                'image_url' => '/images/Alice-Through-The-looking-Glass.png',
                'stock_quantity' => 33,
            ],
                [
                'name' => 'The Amazzing Spider-man Man on a Rampage',
                'description' => 'The story features Spider-Man (Peter Parker) going on an aggressive search for the Master Planner',
                'price' => 1.99,
                'sale_price' => 1.99,
                'category' => 'Books',
                'image_url' => '/images/Spiderman.png',
                'stock_quantity' => 4,
            ],
            [
                'name' => 'Harry Potter: The Complete Collection',
                'description' => 'This box set contains all seven novels to whisk you away to Hogwarts and beyond',
                'price' => 35.00,
                'sale_price' => 35.00,
                'category' => 'Books',
                'image_url' => 'public/images/HarryPotter.png',
                'stock_quantity' => 33,
            ],
            //Offers
            [
                'name' => 'Brother Sewing machine',
                'description' => 'Mid/ High level sewing machine with additional accessories\nComes packaged with a wide table and free motion embroidery foot',
                'price' => 350.00,
                'sale_price' => 279.00,
                'category' => 'Offers',
                'image_url' => 'public/images/Sewing machine.png',
                'stock_quantity' => 9,
            ],
            [
                'name' => 'Acrylic Paint set',
                'description' => 'Easy to use washable paint set with Palette 2x Canvases and acrylic paint set',
                'price' => 169.00,
                'sale_price' => 119,98,
                'category' => 'Offers',
                'image_url' => 'images/building-blocks.jpg',
                'stock_quantity' => 22,
            ],
        
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
