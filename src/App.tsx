import { useMemo, useState } from "react";

const ACTIVITY_META = [
  { id: 1, name: "Quadruple Verbs", colour: "bg-blue-700", hint: "Continue the sentence with more strong actions." },
  { id: 2, name: "Triple Descriptors", colour: "bg-emerald-700", hint: "Add three noun groups that describe the place." },
  { id: 3, name: "A / And / Name", colour: "bg-red-700", hint: "Add a second fact, then finish with the person’s action." },
  { id: 4, name: "Em Dash Descriptor", colour: "bg-orange-700", hint: "Add two clear descriptors inside the em dashes." },
  { id: 5, name: "Many / Most", colour: "bg-purple-700", hint: "Finish the contrast after ‘though most’." },
  { id: 6, name: "Phrase Injector", colour: "bg-pink-700", hint: "Add an opening phrase before the main sentence." },
  { id: 7, name: "Double Hand Technique", colour: "bg-cyan-700", hint: "Add the second held item, then finish the action." },
  { id: 8, name: "Fancy Colours", colour: "bg-amber-700", hint: "Use the colour phrase naturally inside a complete sentence." },
  { id: 9, name: "Quality Verbs", colour: "bg-lime-700", hint: "Use two quality verbs, then complete the image." },
  { id: 10, name: "Adjective Sentence", colour: "bg-indigo-700", hint: "Add useful adjectives that sharpen the picture." },
  { id: 11, name: "Adverb Metaphor", colour: "bg-fuchsia-700", hint: "Complete the metaphor, then extend it." },
  { id: 12, name: "Personification / Sound", colour: "bg-sky-700", hint: "Use sound and personification together." },
  { id: 13, name: "Choosing Verbs", colour: "bg-teal-700", hint: "Choose the strongest verbs, then finish the sentence." }
];

const SETS = [
  {
    title: "Set 1",
    activities: [
      ["Strolling leisurely through the park, the artist painted a serene landscape, captured its beauty with his camera and displayed it in his gallery.", "Strolling leisurely through the park, the artist painted a serene landscape, …"],
      ["The cityscape dazzled with its glittering skyscrapers, bustling streets, and neon lights.", "The cityscape dazzled with its …"],
      ["A skilled detective, and astute observer, Sarah was able to solve even the most perplexing cases.", "A skilled detective, and …"],
      ["As she gazed at the painting, all colours — the soft hues of the sky, the vivid tones of the flowers — seemed to blend together.", "As she gazed at the painting, all colours — …"],
      ["Many tourists visited the ancient ruins, though most were content to admire the pictures in their guidebooks.", "Many tourists visited the ancient ruins, though most …"],
      ["Without warning, the storm raged through the night, which made it impossible to sleep.", "…, the storm raged through the night, which made it impossible to sleep."],
      ["With the basket of fresh fruits in one hand, and his bicycle helmet in the other, Thomas rode back home through the busy streets.", "With the basket of fresh fruits in one hand, and …"],
      ["In the autumn breeze, the emerald green leaves of the trees rustled above the path.", "In the autumn breeze, the emerald green leaves …"],
      ["The dancers twirled and leapt gracefully across the stage.", "The dancers …"],
      ["The shiny silver car zoomed down the narrow, winding road.", "The … car zoomed down the … road."],
      ["Suddenly, the sky cracked open like a raw egg, spilling torrents of rain onto the parched earth.", "Suddenly, the sky cracked open like …"],
      ["Amidst the storm, the wind howled like a furious, vengeful monster, its angry voice shaking the trees and rattling the windows.", "Amidst the storm, the wind …"],
      ["The sunlight streamed through the trees, illuminating the forest in a warm, golden glow.", "The sunlight [filtered / streamed] through the trees, [illuminating / drenching] …"]
    ],
    gemmell: "The beach was a tranquil paradise that soothed Mia’s troubled mind. The rhythmic sound of the waves provided a calming backdrop to the seagulls’ harmonious song. Shells of all shapes and sizes lay scattered on the sand, gleaming like precious jewels in the early morning light. A soft breeze carried the salty scent of the ocean, mingled with the fragrant aroma of coconut oil. A lone hermit crab scuttled across the beach, disappearing into its shell as Mia approached."
  },
  {
    title: "Set 2",
    activities: [
      ["Gliding effortlessly on the ice, the figure skater executed a triple axel, landed perfectly and bowed gracefully to the cheering crowd.", "Gliding effortlessly on the ice, the figure skater executed a triple axel, …"],
      ["The majestic mountain range towered with its rugged peaks, snow-capped summits, and verdant valleys.", "The majestic mountain range towered with its …"],
      ["A compassionate nurse, and tireless worker, John went above and beyond to care for his patients.", "A compassionate nurse, and …"],
      ["As the sun set over the city, all sounds — the blaring horns of cars, the chatter of pedestrians — faded into the peaceful evening.", "As the sun set over the city, all sounds — …"],
      ["Many children enjoyed the taste of vegetables, though most preferred to fill up on sugary snacks.", "Many children enjoyed the taste of vegetables, though most …"],
      ["Working with quiet focus, the chef prepared a delectable meal, which was perfectly seasoned and cooked.", "…, the chef prepared a delectable meal, which was perfectly seasoned and cooked."],
      ["With the heavy toolbox in one hand, and a cup of coffee in the other, Jack set out to repair his broken fence.", "With the heavy toolbox in one hand, and …"],
      ["Across the bright horizon, the golden sun shone on the sapphire blue ocean, casting a warm glow over the beach.", "Across the bright horizon, the golden sun shone on the …"],
      ["The birds chirped and sang in the trees above.", "The birds …"],
      ["The mysterious stranger wore a dark, hooded cloak that concealed his handsome, rugged features.", "The mysterious stranger wore a … cloak that concealed his … features."],
      ["Eerily, the abandoned building loomed like a haunted spectre, its empty windows staring out like soulless eyes.", "Eerily, the abandoned building loomed like …"],
      ["In the night, the stars twinkled like a thousand tiny diamonds, their soft light illuminating the dark, velvet sky.", "In the night, the stars …"],
      ["The wind whispered through the alley, caressing the fallen leaves in a gentle, rhythmic dance.", "The wind [howled / whispered] through the alley, [tossing / caressing] …"]
    ],
    gemmell: "The market was a vibrant, bustling hub that tantalised Sofia’s senses. An array of colourful fruits and vegetables filled every corner, their scents mingling in the air. Spices of every kind lay in piles, their pungent aromas wafting across the stalls. The sound of bartering filled the air, as vendors vied for customers. The market was a feast for the eyes, with a variety of textiles, pottery, and handmade crafts on display. A stray dog weaved in and out of the stalls, sniffing for scraps."
  },
  {
    title: "Set 3",
    activities: [
      ["Hiking up the mountain trail, the adventurer reached the summit, took in the panoramic view and descended safely.", "Hiking up the mountain trail, the adventurer reached the summit, …"],
      ["The peaceful countryside glowed with its rolling hills, sprawling meadows, and serene streams.", "The peaceful countryside glowed with its …"],
      ["A talented chef, and creative artist, Maria transformed simple ingredients into culinary masterpieces.", "A talented chef, and …"],
      ["As she walked through the forest, all sensations — the crunch of leaves underfoot, the whisper of the wind — enveloped her.", "As she walked through the forest, all sensations — …"],
      ["Many couples went out on romantic dates, though most preferred to stay in and watch movies.", "Many couples went out on romantic dates, though most …"],
      ["With wild excitement, the children played games in the park, which lasted until the sun set.", "…, the children played games in the park, which lasted until the sun set."],
      ["With the colourful balloons in one hand, and her little son’s hand in the other, Sarah prepared for his birthday party.", "With the colourful balloons in one hand, and …"],
      ["Beside the old fence, the scarlet red roses bloomed in the garden, their petals soft to the touch.", "Beside the old fence, the scarlet red roses …"],
      ["The chef sautéed and simmered the vegetables to perfection.", "The chef …"],
      ["The fluffy white snow fell softly on the quiet, peaceful town, covering it in a pristine, wintry blanket.", "The … snow fell softly on the … town, covering it in a … blanket."],
      ["Quietly, the snowflakes danced like delicate ballerinas, pirouetting gracefully in the frigid winter air.", "Quietly, the snowflakes danced like …"],
      ["Beneath the waves, the ocean roared like a wild, untamed beast, its powerful waves crashing against the rocky shore.", "Beneath the waves, the ocean …"],
      ["The waves crashed against the shore, churning the smooth, sandy beach with their frothy, white foam.", "The waves [crashed / lapped] against the shore, [churning / caressing] …"]
    ],
    gemmell: "The mountain trail was a cold, lonely path that tested every step. Loose stones shifted under the adventurer’s boots, clicking and sliding down the slope. Patches of white snow clung to the rocks, while thin streams trickled across the track and disappeared beneath the scrub. The wind carried the sharp smell of ice and wet earth. Far below, the valley stretched out in soft greens and silver lines. A small bird darted from a branch, vanished into the mist, and left the trail silent again."
  },
  {
    title: "Set 4",
    activities: [
      ["Strumming his guitar on stage, the musician belted out a soulful ballad, rocked the audience and signed autographs.", "Strumming his guitar on stage, the musician belted out a soulful ballad, …"],
      ["The enchanting forest brimmed with its towering trees, lush undergrowth, and babbling brooks.", "The enchanting forest brimmed with its …"],
      ["An accomplished author, and captivating storyteller, David held his readers in suspense with each turn of phrase.", "An accomplished author, and …"],
      ["As she read the book, all emotions — the joy of laughter, the sorrow of loss — flitted across her face.", "As she read the book, all emotions — …"],
      ["Many people enjoyed the outdoors, though most preferred to stay indoors and avoid the heat.", "Many people enjoyed the outdoors, though most …"],
      ["With steady hands, the driver navigated the winding roads, which led to breathtaking views of the valley.", "…, the driver navigated the winding roads, which led to breathtaking views of the valley."],
      ["With the handwritten notes in one hand, and a pen in the other, Emily presented her research findings to the board members.", "With the handwritten notes in one hand, and …"],
      ["Inside the quiet room, the deep purple velvet curtains added a touch of luxury to the living room.", "Inside the quiet room, the deep purple velvet curtains …"],
      ["The waves crashed and roared against the rocky cliffs.", "The waves …"],
      ["The magnificent castle stood tall and proud on the steep, rocky hill, overlooking the vast, green valley below.", "The … castle stood tall and proud on the … hill, overlooking the … valley below."],
      ["Incredibly, the mountain rose like a great, slumbering beast, its massive bulk dominating the horizon.", "Incredibly, the mountain rose like …"],
      ["At dawn, the sun rose like a radiant, glowing orb, its warm light chasing away the dark shadows of the night.", "At dawn, the sun …"],
      ["The fire crackled in the fireplace, warming the cosy, peaceful room with its soft, glowing light.", "The fire [crackled / popped] in the fireplace, [warming / illuminating] …"]
    ],
    gemmell: "The forest was a rich, shadowy place that seemed alive with hidden movement. Tall trees rose above the track, their branches twisting together like old fingers. Ferns crowded the ground, brushing against ankles and hiding fallen logs beneath their leaves. Somewhere deeper in the bush, water bubbled over stones with a soft, steady sound. The air smelled of bark, moss, and damp soil. A blue butterfly flickered between two trees, rested for a moment, then vanished into the green."
  },
  {
    title: "Set 5",
    activities: [
      ["Jogging in the park, the athlete sprinted to the finish line, broke the record and received a medal.", "Jogging in the park, the athlete sprinted to the finish line, …"],
      ["The tranquil lake shimmered with its crystal-clear waters, undulating waves, and picturesque shoreline.", "The tranquil lake shimmered with its …"],
      ["A dedicated teacher, and patient mentor, Rachel inspired her students to reach for their full potential.", "A dedicated teacher, and …"],
      ["As she stepped onto the stage, all nerves — the fluttering of her heart, the clammy sweat of her palms — vanished into the spotlight.", "As she stepped onto the stage, all nerves — …"],
      ["Many students studied hard for their exams, though most preferred to cram the night before.", "Many students studied hard for their exams, though most …"],
      ["After a thoughtful pause, the librarian recommended a book, which was a captivating story of love and loss.", "…, the librarian recommended a book, which was a captivating story of love and loss."],
      ["With the camping gear in one hand, and a map in the other, Eric set out to explore the wilderness.", "With the camping gear in one hand, and …"],
      ["Under the soft lights, the turquoise blue walls of the bathroom gave it a calm and serene atmosphere.", "Under the soft lights, the turquoise blue walls …"],
      ["The horse galloped and neighed as it raced across the field.", "The horse …"],
      ["The delicious aroma of the fresh, hot pizza wafted through the cosy, dimly lit restaurant, tempting the hungry customers.", "The … aroma of the … pizza wafted through the … restaurant, tempting the … customers."],
      ["Slowly, the sun sank like a fiery red ball into the cool, calm sea, casting a warm orange glow over the tranquil waves.", "Slowly, the sun sank like …"],
      ["Through the forest, the leaves rustled like whispering, secretive voices, their soft sound echoing through the quiet woods.", "Through the forest, the leaves …"],
      ["The cars whizzed along the street, rushing through the busy city with a frenzied, urgent energy.", "The cars [honked / whizzed] along the street, [blaring / rushing] …"]
    ],
    gemmell: "The lake was a quiet stretch of water that made the whole afternoon feel slower. Small waves rolled toward the shore, tapping gently against the stones. Dragonflies skimmed across the surface, their wings flashing in the sunlight. Reeds swayed beside the bank, whispering whenever the breeze moved through them. The air carried the clean smell of water and mud. Near the edge, a turtle lifted its head, blinked once, and slipped beneath the ripples."
  },
  {
    title: "Set 6",
    activities: [
      ["Twirling in the ballroom, the dancer pirouetted elegantly, dipped his partner and waltzed to the music.", "Twirling in the ballroom, the dancer pirouetted elegantly, …"],
      ["The lavish mansion gleamed with its ornate decor, polished floors, and grand staircase.", "The lavish mansion gleamed with its …"],
      ["A resourceful engineer, and innovative thinker, Tom designed solutions to complex problems that revolutionised the industry.", "A resourceful engineer, and …"],
      ["As she took a bite of the cake, all flavours — the sweet vanilla, the tangy raspberry — burst onto her tongue.", "As she took a bite of the cake, all flavours — …"],
      ["Many patients followed their doctor’s orders, though most preferred to take matters into their own hands.", "Many patients followed their doctor’s orders, though most …"],
      ["With exhausted pride, the athlete completed the marathon, which was a remarkable feat of endurance and determination.", "…, the athlete completed the marathon, which was a remarkable feat of endurance and determination."],
      ["With the camera bag in one hand, and a tripod in the other, Anne went out to photograph the sunset.", "With the camera bag in one hand, and …"],
      ["At the front entrance, the ivory white marble floors of the foyer shone in the morning light.", "At the front entrance, the ivory white marble floors …"],
      ["The children laughed and played in the park under the warm sun.", "The children …"],
      ["The elegant ballerina danced gracefully across the spacious, mirrored studio, her lithe, nimble body moving with ease.", "The … ballerina danced gracefully across the … studio, her … body moving with ease."],
      ["Stealthily, the thief moved like a wily, elusive fox, darting in and out of the shadows, evading capture.", "Stealthily, the thief moved like …"],
      ["Along the street, the cars honked like a chorus of angry horns, their loud noise filling the air with unpleasant energy.", "Along the street, the cars …"],
      ["The rain pounded against the roof, relentless in its steady, rhythmic beat against the sturdy tiles.", "The rain [pattered / pounded] against the roof, [soothing / relentless] …"]
    ],
    gemmell: "The mansion was a grand, polished place that made every sound seem important. Marble floors shone beneath the chandelier, reflecting small pieces of golden light. Heavy curtains framed the tall windows, and portraits watched from the walls with serious, painted faces. The staircase curved upward, its wooden rail smooth from years of careful hands. The air smelled faintly of flowers, wax, and old paper. A black cat crossed the hallway, paused beside a doorway, and disappeared without a sound."
  },
  {
    title: "Set 7",
    activities: [
      ["Walking briskly to the station, the commuter boarded the train, found a seat and read the newspaper.", "Walking briskly to the station, the commuter boarded the train, …"],
      ["The quaint village charmed with its colourful cottages, quaint storefronts, and bustling town square.", "The quaint village charmed with its …"],
      ["A tireless athlete, and determined competitor, Lisa pushed herself to new heights with each race.", "A tireless athlete, and …"],
      ["As she climbed the mountain, all sights — the sprawling valleys, the towering peaks — left her breathless.", "As she climbed the mountain, all sights — …"],
      ["Many travellers explored new cultures, though most preferred to stick to what they knew.", "Many travellers explored new cultures, though most …"],
      ["Beneath the glowing stage lights, the concertgoers listened to the band, which played their greatest hits and some new songs.", "…, the concertgoers listened to the band, which played their greatest hits and some new songs."],
      ["With the large toolbox in one hand, and a ladder in the other, Dave began to repair his roof.", "With the large toolbox in one hand, and …"],
      ["Through the crowded streets, the canary yellow taxi honked as it weaved through traffic.", "Through the crowded streets, the canary yellow taxi …"],
      ["The musician strummed and sang to the crowd, mesmerising them with each note.", "The musician …"],
      ["The ancient ruins of the grand, majestic temple lay in ruins in the middle of the vast, scorching desert.", "The … ruins of the … temple lay in the middle of the … desert."],
      ["Gloriously, the garden bloomed like a vibrant, living tapestry, bursting with colour and life.", "Gloriously, the garden bloomed like …"],
      ["In the field, the flowers swayed like a delicate dance, their vibrant petals moving gently in the warm air.", "In the field, the flowers …"],
      ["The birds trilled in the trees, warbling their sweet, melodious songs in the quiet forest.", "The birds [chirped / trilled] in the trees, [singing / warbling] …"]
    ],
    gemmell: "The village was a cheerful place that seemed to wake all at once. Shop doors opened along the main street, sending out the smell of bread, coffee, and fresh paint. Colourful cottages leaned close to the footpath, their window boxes crowded with flowers. People called greetings across the square as bicycles rattled over the stones. A small fountain splashed in the centre, catching sunlight on its broken surface. Near the bakery, a dog stretched in a patch of warmth and watched the morning begin."
  },
  {
    title: "Set 8",
    activities: [
      ["Browsing the bookstore, the reader perused the shelves, selected a novel and devoured it in one sitting.", "Browsing the bookstore, the reader perused the shelves, …"],
      ["The vibrant marketplace bustled with its eclectic vendors, fragrant spices, and colourful textiles.", "The vibrant marketplace bustled with its …"],
      ["A gifted artist, and insightful critic, James captured the essence of his subjects with each brushstroke.", "A gifted artist, and …"],
      ["As she stepped onto the beach, all smells — the salty sea breeze, the warm sand — made her feel alive.", "As she stepped onto the beach, all smells — …"],
      ["Many readers devoured books by their favourite authors, though most preferred to skim headlines on their smartphones.", "Many readers devoured books by their favourite authors, though most …"],
      ["After months of careful work, the artist painted a masterpiece, which was a stunning portrait of his muse.", "…, the artist painted a masterpiece, which was a stunning portrait of his muse."],
      ["With the bouquet of fresh flowers in one hand, and a card in the other, Lisa set out to surprise her best friend on her birthday.", "With the bouquet of fresh flowers in one hand, and …"],
      ["Along the footpath, the burnt orange leaves of the trees signalled the start of autumn.", "Along the footpath, the burnt orange leaves …"],
      ["The carpenter sawed and sanded the wood, crafting a beautiful table from scratch.", "The carpenter …"],
      ["The sweet, gentle melody of the music flowed softly through the calm, quiet night, filling the air with a soothing, peaceful ambience.", "The … melody of the music flowed softly through the … night, filling the air with a … ambience."],
      ["Wildly, the flames leapt like frenzied, hungry beasts, devouring everything in their path with an insatiable appetite.", "Wildly, the flames leapt like …"],
      ["Among the clouds, the thunder rumbled like a powerful, ominous drum, its deep sound echoing across the vast sky.", "Among the clouds, the thunder …"],
      ["The leaves crunched beneath her feet, crackling softly as she walked through the quiet woods.", "The leaves [rustled / crunched] beneath her feet, [whispering / crackling] …"]
    ],
    gemmell: "The marketplace was a noisy, colourful place that pulled people in from every street. Stalls crowded the square, stacked with fruit, cloth, baskets, and jars of bright spices. Voices rose and fell as sellers called out prices and customers bargained with quick smiles. The air smelled of oranges, roasted nuts, and warm bread. Coins clinked on wooden counters, and paper bags rustled in busy hands. A stray cat slipped beneath a table, stole a scrap of fish, and vanished between two crates."
  },
  {
    title: "Set 9",
    activities: [
      ["Cooking a gourmet meal, the chef sautéed the ingredients, baked the soufflé and presented it to the discerning diners.", "Cooking a gourmet meal, the chef sautéed the ingredients, …"],
      ["The ancient ruins stood with their weathered stones, intricate carvings, and haunting beauty.", "The ancient ruins stood with their …"],
      ["A skilled pilot, and experienced navigator, Sarah guided her passengers safely through even the most turbulent skies.", "A skilled pilot, and …"],
      ["As she listened to the music, all rhythms — the pounding of the drums, the flutter of the piano — ignited her soul.", "As she listened to the music, all rhythms — …"],
      ["Many sports fans cheered on their teams, though most preferred to watch from the comfort of their own homes.", "Many sports fans cheered on their teams, though most …"],
      ["After a punishing climb, the hiker climbed the mountain, which provided a panoramic view of the surrounding landscape.", "…, the hiker climbed the mountain, which provided a panoramic view of the surrounding landscape."],
      ["With the leather briefcase in one hand, and a coffee mug in the other, James stepped out to catch his morning train.", "With the leather briefcase in one hand, and …"],
      ["Parked beside the kerb, the silver metallic finish of the car gleamed in the sun.", "Parked beside the kerb, the silver metallic finish …"],
      ["The athlete sprinted and lunged across the finish line, winning the race.", "The athlete …"],
      ["The bold, vibrant colours of the beautiful, blooming flowers painted the garden in a lively, cheerful hue.", "The … colours of the … flowers painted the garden in a … hue."],
      ["Grimly, the storm clouds gathered like a dark, foreboding army, ready to unleash their fury on the unsuspecting world.", "Grimly, the storm clouds gathered like …"],
      ["Over the city, the airplanes buzzed like a swarm of busy bees, their powerful engines roaring through the air.", "Over the city, the airplanes …"],
      ["The mountain loomed tall in the distance, guarding over the rugged, majestic landscape with its towering peak.", "The mountain [loomed / stood] tall in the distance, [watching / guarding] …"]
    ],
    gemmell: "The ancient ruins were a silent place that seemed to remember everything. Broken columns stood among the weeds, their stone faces worn smooth by wind and rain. Carvings twisted along the walls, showing animals, warriors, and symbols nobody could fully explain. Dust gathered in the cracks, and small lizards warmed themselves on fallen blocks. The air smelled dry, sharp, and old. Above the highest wall, a hawk circled once, then glided away over the empty stones."
  },
  {
    title: "Set 10",
    activities: [
      ["Gardening in the backyard, the green thumb pruned the hedges, weeded the beds and planted new flowers.", "Gardening in the backyard, the green thumb pruned the hedges, …"],
      ["The bustling harbour teemed with its towering cranes, bustling cargo ships, and busy workers.", "The bustling harbour teemed with its …"],
      ["A brilliant scientist, and meticulous researcher, Mark discovered groundbreaking insights that changed the field forever.", "A brilliant scientist, and …"],
      ["As she looked at the sky, all shapes — the wispy clouds, the radiant sun — formed a canvas of beauty.", "As she looked at the sky, all shapes — …"],
      ["Many drivers obeyed traffic laws, though most preferred to speed and take risks on the road.", "Many drivers obeyed traffic laws, though most …"],
      ["With careful precision, the scientist conducted an experiment, which revealed new insights into the mysteries of the universe.", "…, the scientist conducted an experiment, which revealed new insights into the mysteries of the universe."],
      ["With the duffel bag in one hand, and a bottle of water in the other, Jane set out to hike the local trail.", "With the duffel bag in one hand, and …"],
      ["Behind the white bedframe, the blush pink walls of the bedroom created a romantic and intimate setting.", "Behind the white bedframe, the blush pink walls …"],
      ["The writer penned and edited each word of her novel, perfecting it over time.", "The writer …"],
      ["The powerful, majestic eagle soared high in the bright, cloudless sky, scanning the landscape below for prey.", "The … eagle soared high in the … sky, scanning the landscape below for prey."],
      ["Brightly, the sun shone like a radiant, golden orb, casting a brilliant, warm light over the lush, green landscape.", "Brightly, the sun shone like …"],
      ["Against the wall, the rain splattered like a thousand tiny fingers, its soft tapping sound filling the quiet room.", "Against the wall, the rain …"],
      ["The river gurgled along the shore, babbling in a soft, soothing rhythm in the tranquil countryside.", "The river [flowed / gurgled] along the shore, [rippling / babbling] …"]
    ],
    gemmell: "The harbour was a busy place that never seemed to rest. Tall cranes swung slowly above the docks, lifting containers from one stack to another. Cargo ships groaned against their ropes while gulls wheeled and cried overhead. Workers moved between trucks, forklifts, and piles of heavy rope. The air smelled of salt, diesel, and wet timber. Near the edge of the pier, a silver fish broke the surface, flashed in the light, and disappeared beneath the dark water."
  },
  {
    title: "Set 11",
    activities: [
      ["Racing across the oval, the striker trapped the ball, dodged two defenders and fired at the goal.", "Racing across the oval, the striker trapped the ball, …"],
      ["The old library waited with its towering shelves, brass reading lamps, and dust-softened silence.", "The old library waited with its …"],
      ["A careful listener, and thoughtful speaker, Noah settled the argument before it grew worse.", "A careful listener, and …"],
      ["As the bus pulled away, all details — the fogged windows, the waving hands — blurred into the morning traffic.", "As the bus pulled away, all details — …"],
      ["Many players practised before school, though most avoided the difficult drills that built real skill.", "Many players practised before school, though most …"],
      ["With a nervous grin, the magician opened the box, which had been locked since lunchtime.", "…, the magician opened the box, which had been locked since lunchtime."],
      ["With a muddy football in one hand, and his torn boots in the other, Liam limped back to the change rooms.", "With a muddy football in one hand, and …"],
      ["Beside the dam, the slate grey rocks warmed slowly in the afternoon sun.", "Beside the dam, the slate grey rocks …"],
      ["The dog bounded and skidded across the wet grass.", "The dog …"],
      ["The crooked timber fence leaned over the dry, cracked paddock.", "The … fence leaned over the … paddock."],
      ["Abruptly, the classroom fell silent like a radio switched off mid-song.", "Abruptly, the classroom fell silent like …"],
      ["Beyond the fence, the gate groaned like an old man waking from sleep, its rusty hinge squealing in protest.", "Beyond the fence, the gate …"],
      ["The smoke drifted through the trees, curling above the campsite in thin, silver ribbons.", "The smoke [drifted / blasted] through the trees, [curling / hammering] …"]
    ],
    gemmell: "The old library was a calm, dusty place that made people lower their voices. Tall shelves rose on every side, packed with books whose spines had faded to brown, green, and gold. Brass lamps glowed on the reading tables, throwing soft circles of light across the polished wood. The air smelled of paper, dust, and raincoats drying near the door. Somewhere between the aisles, a page turned with a gentle whisper. A moth fluttered around one lamp, bumped the shade, and settled on an open book."
  },
  {
    title: "Set 12",
    activities: [
      ["Climbing onto the jetty, the fisherman checked the line, tightened the knot and cast into the channel.", "Climbing onto the jetty, the fisherman checked the line, …"],
      ["The school corridor echoed with its slamming lockers, hurried footsteps, and drifting voices.", "The school corridor echoed with its …"],
      ["A patient tutor, and clear explainer, Emily helped the younger students understand the problem.", "A patient tutor, and …"],
      ["As the curtain lifted, all movements — the shuffle of feet, the lift of arms — sharpened under the stage lights.", "As the curtain lifted, all movements — …"],
      ["Many teenagers wanted independence, though most still relied on their parents for the hardest decisions.", "Many teenagers wanted independence, though most …"],
      ["After the final whistle, the captain addressed the team, which had fought hard until the end.", "…, the captain addressed the team, which had fought hard until the end."],
      ["With a stack of exercise books in one hand, and a red pen in the other, Ms Patel hurried toward the classroom.", "With a stack of exercise books in one hand, and …"],
      ["Under the shop awning, the cherry red bicycle rested against the glass window.", "Under the shop awning, the cherry red bicycle …"],
      ["The toddler giggled and clapped beside the pram.", "The toddler …"],
      ["The heavy metal gate scraped across the uneven, gravel driveway.", "The … gate scraped across the … driveway."],
      ["Carefully, the crane lowered the beam like a giant placing a matchstick.", "Carefully, the crane lowered the beam like …"],
      ["Across the yard, the sprinkler hissed like a whispering snake, its mist crawling over the grass.", "Across the yard, the sprinkler …"],
      ["The torch beam sliced through the shed, revealing old tools on the back wall.", "The torch beam [sliced / wandered] through the shed, [revealing / hiding] …"]
    ],
    gemmell: "The school corridor was a loud, crowded place between lessons. Lockers slammed along the walls, and shoes squeaked across the polished floor. Students hurried past with books pressed to their chests and bags bouncing against their backs. Voices echoed from every direction, mixing with the distant ring of the bell. The air smelled of lunchboxes, pencil shavings, and wet jumpers. Near the noticeboard, a lost worksheet slid from a folder and drifted quietly under the benches."
  },
  {
    title: "Set 13",
    activities: [
      ["Kneeling beside the creek, the ranger measured the water, recorded the level and radioed the station.", "Kneeling beside the creek, the ranger measured the water, …"],
      ["The science lab smelled of its sharp chemicals, plastic trays, and warm equipment.", "The science lab smelled of its …"],
      ["A brave rescuer, and quick thinker, Sophie pulled the child away from the flooded drain.", "A brave rescuer, and …"],
      ["As the storm approached, all warnings — the darkening clouds, the sudden stillness — pointed toward trouble.", "As the storm approached, all warnings — …"],
      ["Many shoppers searched for bargains, though most ignored the small local stores that needed support.", "Many shoppers searched for bargains, though most …"],
      ["During the power outage, the neighbours gathered outside, which turned the street into a temporary meeting place.", "…, the neighbours gathered outside, which turned the street into a temporary meeting place."],
      ["With a torch in one hand, and a first-aid kit in the other, Grace stepped into the dark hallway.", "With a torch in one hand, and …"],
      ["Near the harbour wall, the navy blue fishing boat rocked against the rubber tyres.", "Near the harbour wall, the navy blue fishing boat …"],
      ["The helicopter dipped and hovered above the ridge.", "The helicopter …"],
      ["The nervous young actor waited behind the thick, red curtain.", "The … actor waited behind the … curtain."],
      ["Silently, the fog swallowed the road like a blanket dropped over a lamp.", "Silently, the fog swallowed the road like …"],
      ["Inside the cupboard, the pipes clanked like angry bones, their hollow knocking filling the wall.", "Inside the cupboard, the pipes …"],
      ["The crowd surged toward the exit, spilling through the gates in a noisy rush.", "The crowd [surged / wandered] toward the exit, [spilling / floating] …"]
    ],
    gemmell: "The science lab was a bright, careful place where everything had a proper spot. Plastic trays sat in neat rows beside glass beakers and metal tongs. Sharp smells rose from the benches, mixing with the warmth of laptops and old equipment. Posters of planets, cells, and skeletons covered the walls. A tap dripped steadily into the sink, each drop clicking against the steel. On the windowsill, a small plant leaned toward the light, its leaves dusted with white powder."
  },
  {
    title: "Set 14",
    activities: [
      ["Crouching behind the boulder, the scout studied the tracks, marked the map and signalled to the others.", "Crouching behind the boulder, the scout studied the tracks, …"],
      ["The rainforest breathed with its dripping vines, glossy leaves, and hidden birdcalls.", "The rainforest breathed with its …"],
      ["A loyal friend, and honest critic, Ben told Marcus the truth before the audition.", "A loyal friend, and …"],
      ["As the letter opened, all memories — the beach holidays, the birthday candles — rushed back at once.", "As the letter opened, all memories — …"],
      ["Many students enjoyed group work, though most disliked carrying someone who refused to help.", "Many students enjoyed group work, though most …"],
      ["Before anyone could answer, the alarm shrieked across the hall, which sent everyone scrambling for the doors.", "…, the alarm shrieked across the hall, which sent everyone scrambling for the doors."],
      ["With a half-eaten sandwich in one hand, and his laptop charger in the other, Ethan ran for the bus.", "With a half-eaten sandwich in one hand, and …"],
      ["Across the dry creek bed, the ochre orange dust lifted under the ute's tyres.", "Across the dry creek bed, the ochre orange dust …"],
      ["The snake slid and coiled beneath the timber steps.", "The snake …"],
      ["The tiny glass bottle rolled across the polished, marble floor.", "The … bottle rolled across the … floor."],
      ["Fiercely, the argument spread like fire through dry grass.", "Fiercely, the argument spread like …"],
      ["Under the bridge, the river muttered like a tired traveller, its brown water nudging the rocks.", "Under the bridge, the river …"],
      ["The train thundered past the platform, shaking the posters on the station wall.", "The train [thundered / tiptoed] past the platform, [shaking / stroking] …"]
    ],
    gemmell: "The rainforest was a wet, crowded place that wrapped itself around the track. Vines hung from the trees, and glossy leaves caught drops of water like tiny mirrors. The ground was soft with fallen bark, rotting fruit, and dark mud. Birdcalls echoed overhead, sharp and sudden, then disappeared into the green. The air smelled thick with rain, leaves, and damp wood. A beetle crawled across a fern, lifted its shiny shell, and flew into the shadows."
  },
  {
    title: "Set 15",
    activities: [
      ["Balancing on the fence rail, the gymnast steadied her feet, raised her arms and sprang to the mat.", "Balancing on the fence rail, the gymnast steadied her feet, …"],
      ["The museum glowed with its glass cabinets, ancient masks, and polished timber floors.", "The museum glowed with its …"],
      ["A curious scientist, and careful observer, Anika noticed the tiny change in the sample.", "A curious scientist, and …"],
      ["As the car slowed, all signs — the cracked mailbox, the empty driveway — suggested nobody was home.", "As the car slowed, all signs — …"],
      ["Many families visited the beach on weekends, though most left before the evening breeze turned cold.", "Many families visited the beach on weekends, though most …"],
      ["At the edge of the oval, the coach checked the stopwatch, which showed a new personal best.", "…, the coach checked the stopwatch, which showed a new personal best."],
      ["With a paint tray in one hand, and a roller in the other, Mia climbed the stepladder carefully.", "With a paint tray in one hand, and …"],
      ["On the bakery shelf, the honey gold pastries glistened beneath the heat lamps.", "On the bakery shelf, the honey gold pastries …"],
      ["The kookaburras cackled and swooped above the fence line.", "The kookaburras …"],
      ["The battered green kayak scraped along the shallow, sandy bank.", "The … kayak scraped along the … bank."],
      ["Gently, the old song returned like a letter found in a drawer.", "Gently, the old song returned like …"],
      ["Beside the window, the blinds clicked like nervous teeth, their plastic strips trembling in the breeze.", "Beside the window, the blinds …"],
      ["The leaves skittered along the footpath, gathering in the gutter beside the drain.", "The leaves [skittered / rested] along the footpath, [gathering / vanishing] …"]
    ],
    gemmell: "The museum was a quiet, glowing place filled with things from long ago. Glass cabinets lined the walls, holding masks, coins, tools, and cracked clay bowls. Soft lights shone down on each display, making the objects look important and fragile. Footsteps tapped gently across the timber floor. The air smelled of polish, paper, and old fabric. In one corner, a child pressed both hands to the glass and stared at a tiny golden crown."
  },
  {
    title: "Set 16",
    activities: [
      ["Sliding across the kitchen tiles, the puppy chased the ball, crashed into the cupboard and barked at its reflection.", "Sliding across the kitchen tiles, the puppy chased the ball, …"],
      ["The carnival flashed with its spinning rides, striped tents, and sugar-sweet stalls.", "The carnival flashed with its …"],
      ["A disciplined dancer, and powerful performer, Zara held the audience's attention until the final bow.", "A disciplined dancer, and …"],
      ["As the match began, all pressure — the roaring crowd, the tight scoreboard — settled on the striker.", "As the match began, all pressure — …"],
      ["Many children loved adventure stories, though most skipped the descriptive passages that built the world.", "Many children loved adventure stories, though most …"],
      ["With a sudden laugh, the baby dropped the spoon, which bounced twice across the tiles.", "…, the baby dropped the spoon, which bounced twice across the tiles."],
      ["With a fishing rod in one hand, and a bucket of bait in the other, Cooper walked toward the jetty.", "With a fishing rod in one hand, and …"],
      ["Beyond the grandstand, the bottle green oval stretched toward the scoreboard.", "Beyond the grandstand, the bottle green oval …"],
      ["The crowd chanted and stamped beneath the stadium lights.", "The crowd …"],
      ["The sharp silver blade flashed beneath the bright, kitchen light.", "The … blade flashed beneath the … light."],
      ["Instantly, the news hit him like a cricket ball to the ribs.", "Instantly, the news hit him like …"],
      ["At the back fence, the possum screeched like a rusty hinge, its claws scratching the paling.", "At the back fence, the possum …"],
      ["The engine coughed in the driveway, shuddering before it finally stopped.", "The engine [coughed / smiled] in the driveway, [shuddering / floating] …"]
    ],
    gemmell: "The carnival was a bright, restless place that spun with noise and colour. Rides flashed above the crowd, lifting people into the air with sudden shrieks and laughter. Striped tents lined the paths, selling fairy floss, hot chips, and cheap plastic prizes. Music crackled from old speakers while lights blinked across muddy grass. The air smelled of sugar, smoke, and rain. Beside the duck game, a red balloon slipped free from a child’s hand and bobbed toward the dark sky."
  },
  {
    title: "Set 17",
    activities: [
      ["Pedalling through the laneway, the courier dodged the bins, crossed the intersection and delivered the parcel.", "Pedalling through the laneway, the courier dodged the bins, …"],
      ["The bakery welcomed customers with its warm ovens, sugar-dusted trays, and buttery air.", "The bakery welcomed customers with its …"],
      ["A sharp debater, and respectful listener, Priya challenged the idea without attacking the speaker.", "A sharp debater, and …"],
      ["As the photo loaded, all clues — the muddy shoes, the broken branch — became obvious.", "As the photo loaded, all clues — …"],
      ["Many people promised to save money, though most kept buying small things they did not need.", "Many people promised to save money, though most …"],
      ["After the heavy rain, the creek rose quickly, which worried everyone living near the bank.", "…, the creek rose quickly, which worried everyone living near the bank."],
      ["With a folded permission note in one hand, and his lunchbox in the other, Oliver hurried to the office.", "With a folded permission note in one hand, and …"],
      ["In the trophy cabinet, the bronze medal caught a thin line of sunlight.", "In the trophy cabinet, the bronze medal …"],
      ["The skateboard rattled and bounced down the driveway.", "The skateboard …"],
      ["The nervous brown horse stamped beside the narrow, timber gate.", "The … horse stamped beside the … gate."],
      ["Slowly, the secret grew like mould behind a bathroom wall.", "Slowly, the secret grew like …"],
      ["Inside the roof, the rain drummed like restless fingers, its rhythm tapping through the ceiling.", "Inside the roof, the rain …"],
      ["The shadow stretched across the floor, reaching toward the bottom of the door.", "The shadow [stretched / snapped] across the floor, [reaching / singing] …"]
    ],
    gemmell: "The bakery was a warm, welcoming place that made people slow down at the door. Trays of rolls, scrolls, and pies filled the glass cabinet. Sugar dust clung to the counter, and buttery air drifted from the ovens at the back. The floor creaked whenever someone stepped forward in the line. A bell jingled each time the door opened. Near the window, a sparrow hopped along the footpath, pecked at a crumb, and looked in as if waiting for breakfast."
  },
  {
    title: "Set 18",
    activities: [
      ["Wading through the floodwater, the volunteer lifted the child, passed him to safety and returned for the dog.", "Wading through the floodwater, the volunteer lifted the child, …"],
      ["The hospital ward hummed with its beeping monitors, soft footsteps, and drawn curtains.", "The hospital ward hummed with its …"],
      ["A calm leader, and practical organiser, Lucas moved the group away from the danger.", "A calm leader, and …"],
      ["As the house settled, all noises — the creak of timber, the tick of the clock — seemed too loud.", "As the house settled, all noises — …"],
      ["Many athletes wanted victory, though most underestimated the boring routines that created it.", "Many athletes wanted victory, though most …"],
      ["With obvious relief, the principal announced the result, which brought cheers from the hall.", "…, the principal announced the result, which brought cheers from the hall."],
      ["With a wet towel in one hand, and a pair of goggles in the other, Ruby headed back to the pool.", "With a wet towel in one hand, and …"],
      ["At the edge of the reef, the coral pink shells lay scattered across the sand.", "At the edge of the reef, the coral pink shells …"],
      ["The mower growled and lurched through the long grass.", "The mower …"],
      ["The bright plastic kite dipped above the crowded, windy park.", "The … kite dipped above the … park."],
      ["Heavily, the silence pressed down like a wet blanket.", "Heavily, the silence pressed down like …"],
      ["Behind the shed, the branches clawed at the tin wall, their dry tips scraping in the wind.", "Behind the shed, the branches …"],
      ["The candle flickered on the table, throwing small shadows against the wall.", "The candle [flickered / shouted] on the table, [throwing / collecting] …"]
    ],
    gemmell: "The hospital ward was a soft, humming place where everyone moved carefully. Curtains hung between the beds, making small rooms out of pale blue fabric. Monitors beeped beside pillows, and nurses walked past with quiet shoes and clipped voices. The air smelled of soap, plastic, and clean sheets. Sunlight pushed through the blinds in thin white bars. At the end of one bed, a bunch of yellow flowers leaned from a jar, bright against the grey morning."
  },
  {
    title: "Set 19",
    activities: [
      ["Stepping onto the debate stage, the captain adjusted the microphone, scanned the audience and began her argument.", "Stepping onto the debate stage, the captain adjusted the microphone, …"],
      ["The abandoned playground sagged with its rusted swings, cracked slides, and weed-filled sandpit.", "The abandoned playground sagged with its …"],
      ["A generous neighbour, and skilled gardener, Mrs Tran shared vegetables with everyone in the street.", "A generous neighbour, and …"],
      ["As the trophy was lifted, all reactions — the stunned faces, the raised hands — filled the stadium screen.", "As the trophy was lifted, all reactions — …"],
      ["Many students claimed they hated reading, though most enjoyed stories when someone chose the right book.", "Many students claimed they hated reading, though most …"],
      ["With growing confidence, the singer reached the chorus, which carried clearly to the back row.", "…, the singer reached the chorus, which carried clearly to the back row."],
      ["With a tray of cupcakes in one hand, and a roll of streamers in the other, Hannah decorated the table.", "With a tray of cupcakes in one hand, and …"],
      ["Beside the old shed, the moss green wheelbarrow rested against the fence.", "Beside the old shed, the moss green wheelbarrow …"],
      ["The printer whirred and spat out the final page.", "The printer …"],
      ["The lonely white lighthouse stood above the black, jagged rocks.", "The … lighthouse stood above the … rocks."],
      ["Wildly, the rumour raced through the year level like a fox through a henhouse.", "Wildly, the rumour raced through the year level like …"],
      ["Along the gutter, the water gurgled like a child with a secret, its small bubbles popping beside the drain.", "Along the gutter, the water …"],
      ["The flag snapped above the roof, cracking in the hard afternoon wind.", "The flag [snapped / relaxed] above the roof, [cracking / sleeping] …"]
    ],
    gemmell: "The abandoned playground was a sad, forgotten place at the edge of the park. Rusted swings hung crooked from their chains, moving slightly whenever the wind passed through. The slide was cracked down one side, and weeds had grown through the sandpit. Old leaves gathered beneath the monkey bars in dry, curled piles. The air smelled of dust, metal, and cut grass from the nearby oval. A magpie landed on the top rail, tilted its head, and watched the empty swings move."
  },
  {
    title: "Set 20",
    activities: [
      ["Dashing into the kitchen, the waiter grabbed the plates, balanced the tray and hurried back to table seven.", "Dashing into the kitchen, the waiter grabbed the plates, …"],
      ["The train carriage rocked with its faded seats, overhead handles, and tired commuters.", "The train carriage rocked with its …"],
      ["A determined captain, and selfless teammate, Jacob passed the ball instead of taking the easy shot.", "A determined captain, and …"],
      ["As the gate swung open, all smells — the wet soil, the cut grass — drifted from the garden.", "As the gate swung open, all smells — …"],
      ["Many people wanted cleaner parks, though most walked past the rubbish without picking it up.", "Many people wanted cleaner parks, though most …"],
      ["After the long silence, the phone rang again, which made everyone at the table look up.", "…, the phone rang again, which made everyone at the table look up."],
      ["With a school bag in one hand, and a science project in the other, Ella squeezed through the crowded doorway.", "With a school bag in one hand, and …"],
      ["Across the evening sky, the lavender clouds stretched above the darkening rooftops.", "Across the evening sky, the lavender clouds …"],
      ["The waves slapped and foamed around the rocks.", "The waves …"],
      ["The dusty red ute bounced along the narrow, corrugated track.", "The … ute bounced along the … track."],
      ["Suddenly, the idea clicked like a key turning in a stubborn lock.", "Suddenly, the idea clicked like …"],
      ["Near the classroom door, the fan whined like a bored mosquito, its blades chopping the warm air.", "Near the classroom door, the fan …"],
      ["The rain swept across the oval, blurring the white lines beneath the water.", "The rain [swept / tiptoed] across the oval, [blurring / polishing] …"]
    ],
    gemmell: "The train carriage was a tired, rocking place full of quiet faces. Faded seats lined the walls, and silver handles swung gently above people’s heads. Bags rested against shoes, newspapers folded across laps, and phones glowed in tired hands. The wheels clattered beneath the floor with a steady metal rhythm. The air smelled of coffee, raincoats, and warm plastic. Near the doors, a little girl drew a smiley face in the fogged glass before the next station arrived."
  }
];

const DATA = {
  title: "ProStems",
  subtitle: "Super Sentence Drills",
  topic: "Set 1"
};

type SetItem = (typeof SETS)[number] & { theme?: string; paragraphExercise?: string };

const TRANSFER_SETS: SetItem[] = [
  {
    "title": "Set 21",
    "theme": "The trophy thief",
    "activities": [
      [
        "Slipping beneath the rope, the thief lifted the trophy, tucked it under his coat and nodded to the security camera.",
        "Duck behind the curtain and build four linked actions: Ducking behind the curtain, the caretaker …"
      ],
      [
        "The prize cupboard held a dented silver cup, a medal on a frayed ribbon and a shield with one name scratched out.",
        "The lost-property drawer contained …"
      ],
      [
        "A gifted pickpocket and a terrible liar, Theo blamed the trophy’s disappearance on a gust of wind.",
        "A patient investigator and …, Amira …"
      ],
      [
        "When the coat fell open, its contents — a silver trophy and a stolen sausage roll — clattered onto the tiles.",
        "When the suitcase burst open, its contents — … — …"
      ],
      [
        "Many guests noticed the missing trophy, though most kept watching the chocolate fountain.",
        "Many passengers noticed the abandoned suitcase, though most …"
      ],
      [
        "Beneath the winners’ photograph, the cleaner found a trail of silver glitter.",
        "…, the music teacher discovered a muddy shoe on the piano. [inject a phrase that adds timing, place, manner or a complication]"
      ],
      [
        "With a trophy in one hand and a dripping ice block in the other, Theo struggled to open the gate.",
        "With a muddy shoe in one hand and …"
      ],
      [
        "A ribbon of petrol-blue light leaked beneath the stage door.",
        "A patch of rust-red paint …"
      ],
      [
        "The camera swivelled and tracked the thief across the foyer.",
        "The security dog … [use two precise actions]"
      ],
      [
        "A chipped brass plaque hung above the narrow, unlit staircase.",
        "A … envelope lay beneath the … chair."
      ],
      [
        "Silently, suspicion became a cold finger tracing the back of Theo’s neck.",
        "Gradually, guilt became … [extend the metaphor]"
      ],
      [
        "The floorboards complained beneath his shoes, each squeak announcing another guilty step.",
        "The cupboard door … [give it a voice and an attitude]"
      ],
      [
        "The thief edged along the wall, shielding the trophy beneath his coat.",
        "The guard [sauntered / crept] towards the cupboard, [rattling / easing] … [choose for stealth]"
      ]
    ],
    "gemmell": "The school hall smelled of floor polish and hot chips. Paper stars hung above the prize table, turning in the draught from the doors. A silver cup stood between two smaller trophies, its handles catching the stage lights. Shoes squeaked along the aisle. Beneath the table, a loose ribbon stirred. Then a hand reached out from behind the cloth and slowly pulled the cup into the dark.",
    "paragraphExercise": "Describe a museum after closing: establish the place and mood, select sensory details, introduce a small movement and end on a revealing image."
  },
  {
    "title": "Set 22",
    "theme": "The midnight aquarium",
    "activities": [
      [
        "Crawling behind the tank, Zara unplugged the pump, caught the leaking water and shouted for the keeper.",
        "Leaping over the puddle, the night guard … [four linked actions altogether]"
      ],
      [
        "The tank revealed a sunken toy ship, a forest of waving kelp and a crab guarding a bottle cap.",
        "The moonlit rock pool revealed …"
      ],
      [
        "A careful keeper and an enthusiastic inventor, Mei built a feeder that the octopus immediately dismantled.",
        "A fearless diver and …, Finn …"
      ],
      [
        "Beyond the glass, two shapes — a sleeping shark and a drifting ray — crossed in the blue light.",
        "Beneath the jetty, two shadows — … — …"
      ],
      [
        "Many visitors searched for the shark, though most missed the tiny seahorse gripping the rope.",
        "Many campers searched for the owl, though most …"
      ],
      [
        "Against the keeper’s advice, Zara tapped on the octopus tank.",
        "…, the keeper counted one fewer fish than yesterday. [inject a phrase that adds timing, place, manner or a complication]"
      ],
      [
        "With a torch in one hand and a bucket of squid in the other, Mei followed the wet footprints.",
        "With a dripping net in one hand and …"
      ],
      [
        "An ink-blue shadow slid beneath the coral.",
        "A strip of bottle-green sea …"
      ],
      [
        "The octopus gripped and twisted the jar lid.",
        "The hermit crab … [two precise actions]"
      ],
      [
        "A translucent pink jellyfish pulsed beside the cracked, algae-coated window.",
        "A … starfish clung to the … rock."
      ],
      [
        "Patiently, the current became a conveyor belt carrying lost shells towards the drain.",
        "Relentlessly, the tide became … [extend the metaphor]"
      ],
      [
        "The pump coughed twice and grumbled back to life.",
        "The rusty tap … [sound and personification]"
      ],
      [
        "The ray glided over the sand, brushing the bottom with its fins.",
        "The seal [hauled / floated] itself onto the ledge, [slapping / folding] … [choose for a clumsy landing]"
      ]
    ],
    "gemmell": "The aquarium was almost dark. Blue light washed the empty walkway, and the tanks hummed behind thick glass. Salt and wet rope scented the air. A mop stood beside a bucket, its handle reflected in the shark tank. Somewhere, a drip counted the seconds. An octopus arm appeared beneath a loose lid, felt along the rim and curled around the keeper’s forgotten keys.",
    "paragraphExercise": "Describe an empty reptile house: move from its atmosphere through sensory details to a small movement and a final image suggesting trouble."
  },
  {
    "title": "Set 23",
    "theme": "The robot substitute",
    "activities": [
      [
        "Rolling into class, the robot scanned the roll, stamped the worksheets and confiscated its own charging cable.",
        "Clattering through the library doors, the delivery robot … [four linked actions]"
      ],
      [
        "The robot’s desk held a magnetic apple, a stack of blank detention slips and a mug labelled HUMAN FUEL.",
        "The inventor’s workbench held …"
      ],
      [
        "A brilliant mathematician and a literal-minded teacher, Unit Seven marked the question mark as an unanswered question.",
        "A cheerful assistant and …, Unit Nine …"
      ],
      [
        "Inside its chest, two lights — a steady green dot and a flashing red triangle — competed for attention.",
        "Above the control panel, two signals — … — …"
      ],
      [
        "Many students praised the robot’s marking, though most unplugged it before the spelling test.",
        "Many shoppers admired the robot cashier, though most …"
      ],
      [
        "After a worrying burst of static, the robot announced that lunchtime had been cancelled.",
        "…, the robot announced that the class pet was the new principal. [inject a phrase that adds timing, place, manner or a complication]"
      ],
      [
        "With a marker in one hand and a magnet in the other, Unit Seven erased the entire timetable.",
        "With a broken whisk in one hand and …"
      ],
      [
        "Copper-orange sparks scattered across the robot’s silver feet.",
        "An acid-yellow warning light …"
      ],
      [
        "The printer whined and disgorged another hundred worksheets.",
        "The robotic arm … [two precise actions]"
      ],
      [
        "A square steel head turned towards the small, flickering screen.",
        "A … antenna rose above the … casing."
      ],
      [
        "Abruptly, the classroom became a factory stamping identical answers onto identical sheets.",
        "Slowly, the staffroom became … [extend the metaphor]"
      ],
      [
        "The loudspeaker barked an instruction, then sulked in a puddle of static.",
        "The photocopier … [sound and personification]"
      ],
      [
        "The robot lumbered between the desks, clipping every chair with its knees.",
        "The tiny drone [darted / trudged] between the shelves, [dodging / crushing] … [choose for nimble movement]"
      ]
    ],
    "gemmell": "The classroom smelled of warm plastic. Desks stood in exact rows, with a ruler placed across the top of every worksheet. The fluorescent lights buzzed. On the board, a green cursor blinked beside the words GOOD MORNING, HUMANS. A charging cable snaked towards the teacher’s desk. Underneath it, a small metal foot tapped in perfect time with the clock.",
    "paragraphExercise": "Describe a robot’s kitchen: establish an unnatural order, develop sensory details, show a small movement and finish with an unsettling image."
  },
  {
    "title": "Set 24",
    "theme": "The runaway cake",
    "activities": [
      [
        "Diving across the bench, Sam caught the cake, steadied the wobbling tiers and rescued the bride’s sugar crown.",
        "Skidding across the dance floor, the waiter … [four linked actions]"
      ],
      [
        "The ruined icing revealed a crooked chocolate tower, a river of raspberry jam and a tiny bride wearing one boot.",
        "The collapsed gingerbread village revealed …"
      ],
      [
        "A talented baker and an overconfident engineer, Aisha trusted a biscuit bridge to support three kilograms of icing.",
        "A careful decorator and …, Luca …"
      ],
      [
        "On the trolley, two disasters — a leaning cake and a loose wheel — approached the top of the stairs.",
        "Beside the stage, two problems — … — …"
      ],
      [
        "Many guests offered to save the cake, though most arrived with a plate and a fork.",
        "Many neighbours offered to repair the chocolate fountain, though most …"
      ],
      [
        "With one eye on the wobbling tower, Sam edged the trolley away from the stairs.",
        "…, the waiter discovered a biscuit in the bride’s bouquet. [inject a phrase that adds timing, place, manner or a complication]"
      ],
      [
        "With a piping bag in one hand and a spirit level in the other, Aisha inspected her masterpiece.",
        "With a rolling pin in one hand and …"
      ],
      [
        "Cherry-red icing dripped onto the white tablecloth.",
        "A swirl of pistachio-green cream …"
      ],
      [
        "The trolley juddered and veered towards the doorway.",
        "The sugar tower … [two precise actions]"
      ],
      [
        "A glossy chocolate crown slid down the warm, lopsided cake.",
        "A … biscuit roof rested on the … walls."
      ],
      [
        "Mercilessly, the heat became a sculptor bending every sugar flower out of shape.",
        "Steadily, the rain became … [extend the metaphor]"
      ],
      [
        "The fridge groaned at the sight of another enormous tray.",
        "The kitchen timer … [sound and personification]"
      ],
      [
        "The baker dabbed at the crack, coaxing icing into the gap.",
        "The impatient guest [prodded / cradled] the biscuit bridge, [shattering / supporting] … [choose for careless handling]"
      ]
    ],
    "gemmell": "The kitchen was hotter than the dining room. Butter and toasted sugar hung in the air, and flour dusted the tiles like pale footprints. A three-tier cake leaned beneath the extractor fan. Its tiny sugar bride stood at the edge of the top layer, one arm raised. A wheel squeaked. The trolley shifted forward, and the bride tipped face-first into a rose.",
    "paragraphExercise": "Describe a competition table covered in fragile models: atmosphere, sensory details, small movement and a final image marking the beginning of a mishap."
  },
  {
    "title": "Set 25",
    "theme": "The museum alarm",
    "activities": [
      [
        "Squinting into the torchlight, the guard spotted a moving tail, lifted the display cloth and discovered the curator’s cat.",
        "Kneeling beside the broken case, the detective … [four linked actions]"
      ],
      [
        "The cabinet contained a cracked bronze helmet, a tiny clay horse and a tooth longer than the guard’s hand.",
        "The attic trunk contained …"
      ],
      [
        "A respected curator and a secret prankster, Dr Bell placed a rubber duck inside the ancient vase.",
        "A keen historian and …, Jules …"
      ],
      [
        "Across the wall, two shadows — a raised spear and a twitching tail — trembled in the torchlight.",
        "Behind the curtain, two outlines — … — …"
      ],
      [
        "Many visitors studied the ancient coins, though most photographed the duck in the vase.",
        "Many judges studied the science displays, though most …"
      ],
      [
        "Without touching the fragile glass, the detective examined the dusty handprint.",
        "…, the curator found a feather inside the locked cabinet. [inject a phrase that adds timing, place, manner or a complication]"
      ],
      [
        "With a magnifying glass in one hand and a cat biscuit in the other, the guard negotiated with the suspect.",
        "With a museum map in one hand and …"
      ],
      [
        "A tarnished bronze-green helmet sat beneath the spotlight.",
        "A flash of garnet-red velvet …"
      ],
      [
        "The cat stalked and pounced on the projector’s moving dot.",
        "The curator … [two precise actions]"
      ],
      [
        "A narrow iron key lay inside the dusty, velvet-lined case.",
        "A … mask stared through the … window."
      ],
      [
        "Slowly, the museum became a maze feeding the guard from one dark corridor into another.",
        "Quietly, the attic became … [extend the metaphor]"
      ],
      [
        "The alarm shrieked its accusation at the empty hall.",
        "The lift … [sound and personification]"
      ],
      [
        "The guard shuffled past the skeleton, dragging his torch beam across the floor.",
        "The cat [prowled / marched] beneath the cases, [stalking / greeting] … [choose for a hunt]"
      ]
    ],
    "gemmell": "The museum’s long gallery was cold and still. Glass cases reflected the guard’s torch, multiplying each small movement. The air smelled of dust and the lemon cleaner used on the floor. An iron helmet stared from an empty suit of armour. Somewhere behind the ancient coins, something scratched. A black tail rose above the case and curled around the alarm sensor.",
    "paragraphExercise": "Describe an antique shop at night: establish atmosphere, sensory details, one small movement and a final image that changes our understanding."
  },
  {
    "title": "Set 26",
    "theme": "The rooftop rescue",
    "activities": [
      [
        "Clambering onto the roof, Ben tested the gutter, caught the loose ladder and reached for the stranded kitten.",
        "Balancing on the jetty, the lifeguard … [four linked actions]"
      ],
      [
        "The rooftop offered a crooked television aerial, a patch of cracked tiles and a pigeon glaring from the chimney.",
        "The storm-damaged balcony offered …"
      ],
      [
        "A fearless climber and a devoted cat owner, Nia borrowed three ladders and forgot to bring the cat carrier.",
        "A resourceful sailor and …, Ollie …"
      ],
      [
        "Above the gutter, two obstacles — a sagging cable and a furious pigeon — blocked the rescue.",
        "Below the footbridge, two hazards — … — …"
      ],
      [
        "Many neighbours brought advice, though most stayed safely behind their windows.",
        "Many spectators suggested a rescue plan, though most …"
      ],
      [
        "Despite the pigeon’s fierce objections, Ben crawled towards the chimney.",
        "…, the lifeguard noticed a puppy beneath the jetty. [inject a phrase that adds timing, place, manner or a complication]"
      ],
      [
        "With a kitten in one hand and a broken tile in the other, Nia reconsidered her route down.",
        "With a rescue rope in one hand and …"
      ],
      [
        "A slate-grey cloud swallowed the last strip of sunlight.",
        "A band of apricot-orange sky …"
      ],
      [
        "The ladder flexed and scraped against the gutter.",
        "The loose sail … [two precise actions]"
      ],
      [
        "A soaked ginger kitten crouched beneath the cracked, soot-blackened chimney.",
        "A … gull perched on the … railing."
      ],
      [
        "Suddenly, the gap between the roofs became a mouth waiting for Ben’s next step.",
        "Gradually, the rising river became … [extend the metaphor]"
      ],
      [
        "The gutter rattled a warning beneath his boot.",
        "The jetty … [sound and personification]"
      ],
      [
        "The kitten wedged itself behind the chimney, hooking its claws into the mortar.",
        "The puppy [squeezed / strode] beneath the fence, [snagging / polishing] … [choose for a tight escape]"
      ]
    ],
    "gemmell": "The roof was slick after the rain. Water gathered in the hollows of the tiles and trickled into a gutter crowded with leaves. A television aerial clicked against its pole. Far below, a bus sighed at the stop. Beneath the chimney, two green eyes watched the ladder approach. A tiny paw emerged, touched the wet tile and withdrew into the shelter of the brickwork.",
    "paragraphExercise": "Describe a stranded animal beneath a footbridge: move from place and atmosphere through sound and texture to a small, revealing action."
  },
  {
    "title": "Set 27",
    "theme": "The library secret",
    "activities": [
      [
        "Reaching behind the shelf, Priya found a lever, pulled it towards her and opened a door into the wall.",
        "Peering beneath the stage, the caretaker … [four linked actions]"
      ],
      [
        "The secret room held a folding bed, a cupboard of costumes and a clock without hands.",
        "The hidden compartment held …"
      ],
      [
        "A quiet librarian and a champion escape artist, Ms Khan could leave a locked room before the kettle boiled.",
        "A nervous magician and …, Ravi …"
      ],
      [
        "Inside the book, two clues — a pressed fern and a pencilled address — interrupted the story.",
        "Inside the coat pocket, two clues — … — …"
      ],
      [
        "Many readers borrowed the mystery novel, though most returned it without noticing the hollow cover.",
        "Many customers bought the old maps, though most …"
      ],
      [
        "Between the atlas and the cookbook, Priya found a book that was warmer than the others.",
        "…, the magician heard someone knocking inside his empty trunk. [inject a phrase that adds timing, place, manner or a complication]"
      ],
      [
        "With a library card in one hand and a brass key in the other, Ms Khan entered a door labelled STAFF ONLY.",
        "With a theatre ticket in one hand and …"
      ],
      [
        "A wine-red curtain concealed the narrow doorway.",
        "A mustard-yellow label …"
      ],
      [
        "The shelf pivoted and scraped along the floor.",
        "The hidden latch … [two precise actions]"
      ],
      [
        "A slim leather notebook rested on the low, dust-coated table.",
        "A … photograph lay beneath the … box."
      ],
      [
        "Quietly, curiosity became a hook tugging Priya towards the dark opening.",
        "Insistently, doubt became … [extend the metaphor]"
      ],
      [
        "The old clock cleared its throat with a single hollow tick.",
        "The locked drawer … [sound and personification]"
      ],
      [
        "Priya traced the faded address, tilting the page towards the lamp.",
        "The caretaker [skimmed / scrutinised] the torn note, [checking / discarding] … [choose for careful investigation]"
      ]
    ],
    "gemmell": "The library’s back aisle smelled of paper and raincoats. Tall shelves narrowed the light to a thin strip across the carpet. A trolley stood beside the atlas section, its wheels wrapped in hair and dust. From somewhere inside the wall came a quiet ticking. One book protruded from the shelf. Its cover lifted a fraction, although nobody was touching it.",
    "paragraphExercise": "Describe a second-hand bookshop with a concealed space: atmosphere, sensory details, a small movement and an intriguing final image."
  },
  {
    "title": "Set 28",
    "theme": "The carnival bargain",
    "activities": [
      [
        "Threading through the crowd, Evie reached the stall, counted her coins and challenged the grinning stallholder.",
        "Squeezing beneath the market awning, Max … [four linked actions]"
      ],
      [
        "The prize shelf displayed a one-eyed teddy, a plastic crown and a goldfish-shaped whistle.",
        "The magician’s stall displayed …"
      ],
      [
        "A persuasive salesman and an expert juggler, Mr Vale kept three oranges in the air while explaining the rules.",
        "A skilled negotiator and …, Isla …"
      ],
      [
        "Beside the wheel, two signs — FREE TURN and WINNER PAYS — made Evie hesitate.",
        "Above the doorway, two notices — … — …"
      ],
      [
        "Many players won a prize, though most discovered it was smaller than the entrance ticket.",
        "Many shoppers accepted the free sample, though most …"
      ],
      [
        "With her last coin balanced on her thumb, Evie considered the suspiciously easy game.",
        "…, the stallholder offered Isla a second turn. [inject a phrase that adds timing, place, manner or a complication]"
      ],
      [
        "With a crown in one hand and a squeaking hammer in the other, Max marched towards the dodgem cars.",
        "With a spinning plate in one hand and …"
      ],
      [
        "Candyfloss-pink light flickered above the ticket booth.",
        "A row of electric-blue bulbs …"
      ],
      [
        "The prize wheel clicked and shuddered to a stop.",
        "The dodgem car … [two precise actions]"
      ],
      [
        "A faded striped tent sagged beside the bright, crowded carousel.",
        "A … banner fluttered above the … stall."
      ],
      [
        "Gradually, the queue became a snake coiling around the ticket booth.",
        "Suddenly, the crowd became … [extend the metaphor]"
      ],
      [
        "The carousel wheezed through another cheerful tune.",
        "The popcorn machine … [sound and personification]"
      ],
      [
        "Evie flicked the token, sending it skimming across the polished board.",
        "Max [lobbed / placed] the beanbag towards the distant bucket, [clearing / nestling against] … [choose for a long throw]"
      ]
    ],
    "gemmell": "The carnival’s smallest stall stood between two roaring rides. Its canvas roof flapped above a counter sticky with spilled cordial. Plastic prizes dangled from hooks, their painted smiles fading in the heat. The wheel clicked behind the stallholder. Beneath the counter, his shoe nudged a hidden pedal. The pointer slid past the largest prize and settled on a keyring.",
    "paragraphExercise": "Describe a suspicious market game: establish the busy setting, select sensory details, show a small concealed movement and end with its consequence."
  },
  {
    "title": "Set 29",
    "theme": "The weather machine",
    "activities": [
      [
        "Ducking beneath the pipes, Hugo tightened the valve, caught the falling gauge and switched off the indoor thunderstorm.",
        "Wading across the flooded shed, the inventor … [four linked actions]"
      ],
      [
        "The control panel showed a cracked pressure dial, a snowflake-shaped button and a lever marked PROBABLY SAFE.",
        "The submarine dashboard showed …"
      ],
      [
        "A talented inventor and an impatient gardener, Mr Yu built a rain machine that flooded his own tomatoes.",
        "A practical mechanic and …, Hana …"
      ],
      [
        "Above the roof, two warnings — a spiralling cloud and a flash of green lightning — grew harder to ignore.",
        "Across the radar screen, two warnings — … — …"
      ],
      [
        "Many neighbours requested cooler weather, though most objected when snow covered their washing.",
        "Many farmers welcomed the rain, though most …"
      ],
      [
        "Before the hail reached the kitchen, Hugo dragged the machine towards the shed.",
        "…, Hana noticed frost forming around the greenhouse door. [inject a phrase that adds timing, place, manner or a complication]"
      ],
      [
        "With a spanner in one hand and an umbrella in the other, Hana approached the leaking engine.",
        "With a thermometer in one hand and …"
      ],
      [
        "A sulphur-yellow glow filled the machine’s glass chamber.",
        "A streak of violet-grey cloud …"
      ],
      [
        "The valve hissed and spat steam across the bench.",
        "The frozen pipe … [two precise actions]"
      ],
      [
        "A frost-coated copper pipe ran across the wet, slippery floor.",
        "A … dial hung above the … lever."
      ],
      [
        "Relentlessly, the storm became a drummer beating on every roof in the street.",
        "Steadily, the fog became … [extend the metaphor]"
      ],
      [
        "The machine sneezed a shower of ice onto the workbench.",
        "The boiler … [sound and personification]"
      ],
      [
        "Hugo wrestled the lever down, forcing the whining motor to stop.",
        "Hana [feathered / slammed] the control switch, [easing / wrenching] … [choose for a gentle adjustment]"
      ]
    ],
    "gemmell": "The shed smelled of wet timber and hot metal. Coils of copper pipe crowded the bench, and condensation ran down a row of jars. A dial trembled between RAIN and REGRET. Thunder rolled inside the ceiling. On a shelf, a snowflake settled on the inventor’s gardening book. It melted across the word DROUGHT, leaving a small dark stain.",
    "paragraphExercise": "Describe a machine producing unexpected weather in a greenhouse: place, atmosphere, sensory details, small movement and a meaningful final image."
  },
  {
    "title": "Set 30",
    "theme": "The tunnel message",
    "activities": [
      [
        "Wriggling through the opening, Eden brushed away the cobwebs, raised her torch and read the scratched message.",
        "Crouching beside the drain, the explorer … [four linked actions]"
      ],
      [
        "The tunnel floor held a snapped torch, a trail of wet footprints and a biscuit tin tied with string.",
        "The abandoned bunker held …"
      ],
      [
        "A determined explorer and a cautious friend, Eden checked the rope before entering the tunnel.",
        "A curious photographer and …, Noah …"
      ],
      [
        "At the junction, two marks — a chalk arrow and a fresh handprint — pointed in opposite directions.",
        "On the locked gate, two clues — … — …"
      ],
      [
        "Many explorers followed the painted arrows, though most turned back when the arrows stopped.",
        "Many walkers entered the cave, though most …"
      ],
      [
        "Beyond the last patch of daylight, Eden heard water moving beneath the floor.",
        "…, Noah raised his camera towards the bunker entrance. [inject a phrase that adds timing, place, manner or a complication]"
      ],
      [
        "With a torch in one hand and a folded map in the other, Noah compared the tunnel with the drawing.",
        "With a chalk stub in one hand and …"
      ],
      [
        "A chalk-white arrow stood out against the blackened bricks.",
        "A band of clay-red mud …"
      ],
      [
        "Water seeped and pooled around the explorer’s boots.",
        "The torch beam … [two precise actions]"
      ],
      [
        "A frayed nylon rope stretched along the low, moss-covered wall.",
        "A … ladder descended into the … chamber."
      ],
      [
        "Slowly, the darkness became a curtain swallowing each inch of the torch beam.",
        "Gradually, the silence became … [extend the metaphor]"
      ],
      [
        "The tunnel whispered back every word Eden spoke.",
        "The loose grate … [sound and personification]"
      ],
      [
        "Noah inched past the broken ladder, bracing his shoulder against the wall.",
        "Eden [bounded / shuffled] across the unstable boards, [testing / ignoring] … [choose for caution]"
      ]
    ],
    "gemmell": "The tunnel mouth was half-hidden by ferns. Inside, damp bricks pressed close around the narrow path. Water dripped behind the walls, and the air tasted of soil. A rope ran along the floor towards a bend. Beside it, a muddy footprint shone in the torchlight. A second drop of water struck the print, blurring the sharp edge of a heel.",
    "paragraphExercise": "Describe an abandoned bunker: establish its atmosphere, select sensory details, show a small movement and end on evidence that someone has recently visited."
  },
  {
    "title": "Set 31",
    "theme": "The school election",
    "activities": [
      [
        "Stepping onto the stage, Miri unfolded her notes, adjusted the microphone and promised a pool beside the library.",
        "Striding into the debate room, the rival candidate … [four linked actions]"
      ],
      [
        "The campaign table offered a jar of badges, a bowl of free mandarins and a poster promising longer weekends.",
        "The rival campaign stall offered …"
      ],
      [
        "A confident speaker and a reluctant organiser, Miri won the debate and forgot to submit her nomination.",
        "A careful planner and …, Jay …"
      ],
      [
        "Behind the candidate, two promises — shorter homework and longer lunch breaks — filled the poster.",
        "Beside the ballot box, two warnings — … — …"
      ],
      [
        "Many students applauded the swimming-pool proposal, though most asked who would pay for it.",
        "Many voters liked the free-breakfast plan, though most …"
      ],
      [
        "After a question from the back row, Miri quietly crossed out the word GUARANTEED.",
        "…, Jay asked how the free breakfasts would be funded. [inject a phrase that adds timing, place, manner or a complication]"
      ],
      [
        "With a microphone in one hand and a torn poster in the other, Jay explained his revised plan.",
        "With a ballot paper in one hand and …"
      ],
      [
        "A cobalt-blue badge flashed on Miri’s jacket.",
        "A strip of tangerine-orange bunting …"
      ],
      [
        "The audience murmured and shifted when the cost appeared on the screen.",
        "The returning officer … [two precise actions]"
      ],
      [
        "A handwritten paper sign hung above the crowded, sunlit voting desk.",
        "A … badge lay beside the … ballot box."
      ],
      [
        "Suddenly, the question became a pin puncturing Miri’s magnificent promise.",
        "Quietly, the rumour became … [extend the metaphor]"
      ],
      [
        "The microphone squealed its objection to another shouted promise.",
        "The hall speakers … [sound and personification]"
      ],
      [
        "Jay weighed the question, pausing before he answered.",
        "Miri [blurted / measured] her reply, [interrupting / considering] … [choose for an impulsive answer]"
      ]
    ],
    "gemmell": "The hall smelled of warm sandwiches. Campaign posters crowded the walls, and a cardboard ballot box sat beneath the basketball hoop. Shoes scuffed across the floor. Behind the stage, the candidates waited beside a tangled microphone cable. Miri smoothed her notes. On the bottom page, beneath three grand promises, someone had pencilled a small question: HOW?",
    "paragraphExercise": "Describe a debate waiting area: establish its mood, add sensory details, show a revealing small action and finish with a detail suggesting doubt."
  },
  {
    "title": "Set 32",
    "theme": "The dragon inspection",
    "activities": [
      [
        "Stooping through the doorway, the dragon sniffed the ovens, counted the fire extinguishers and signed the safety form.",
        "Squeezing through the workshop gate, the giant … [four linked actions]"
      ],
      [
        "The inspector’s bag contained a heatproof clipboard, a scorched measuring tape and a sandwich wrapped in foil.",
        "The giant’s tool belt carried …"
      ],
      [
        "A strict inspector and a considerate guest, Ember folded her wings before entering the bakery.",
        "A skilled builder and …, Bramble …"
      ],
      [
        "Beside the ovens, two hazards — a pile of flour sacks and a dripping gas pipe — caught Ember’s eye.",
        "Across the workshop, two dangers — … — …"
      ],
      [
        "Many bakers welcomed the dragon inspector, though most moved their biscuits away from her breath.",
        "Many villagers welcomed the giant carpenter, though most …"
      ],
      [
        "Without singeing the curtains, Ember leaned towards the faulty oven.",
        "…, Bramble stepped into the workshop. [inject a phrase that adds timing, place, manner or a complication]"
      ],
      [
        "With a clipboard in one claw and a croissant in the other, Ember considered the bakery’s final score.",
        "With a hammer in one hand and …"
      ],
      [
        "A line of ember-red scales ran down the inspector’s neck.",
        "A patch of lichen-green skin …"
      ],
      [
        "The oven belched and rattled as Ember opened the door.",
        "The giant’s boots … [two precise actions]"
      ],
      [
        "A polished horned helmet rested on the small, flour-dusted table.",
        "A … glove lay across the … doorway."
      ],
      [
        "Patiently, Ember’s stare became a spotlight exposing every crumb beneath the bench.",
        "Slowly, the giant’s shadow became … [extend the metaphor]"
      ],
      [
        "The kettle whistled nervously as the dragon approached.",
        "The workshop door … [sound and personification]"
      ],
      [
        "Ember nibbled the croissant, catching each flake with the tip of a claw.",
        "Bramble [plucked / crushed] the tiny biscuit from the plate, [balancing / grinding] … [choose for unexpected delicacy]"
      ]
    ],
    "gemmell": "The bakery felt very small with a dragon inside. Warm yeast scented the air, and trays of rolls crowded the window. Ember’s scales brushed the ceiling. A kettle whistled behind her folded wing. On the counter, the baker’s pen rolled towards the edge. One enormous claw stopped it gently, its black tip resting beside a single crumb.",
    "paragraphExercise": "Describe a giant visiting a tiny workshop: establish scale and atmosphere, add sensory details, show a small movement and finish with unexpected gentleness."
  },
  {
    "title": "Set 33",
    "theme": "The swapped suitcase",
    "activities": [
      [
        "Hauling the case upstairs, Leni unfastened the straps, lifted the lid and stared at a hundred rubber ducks.",
        "Dragging the trunk into the attic, her brother … [four linked actions]"
      ],
      [
        "The suitcase contained a purple dressing gown, a packet of duck food and a crown made from drinking straws.",
        "The parcel contained …"
      ],
      [
        "A frequent traveller and a careless label-reader, Leni brought home the magician’s luggage.",
        "A meticulous packer and …, Arlo …"
      ],
      [
        "Inside the lid, two details — a circus sticker and a handwritten warning — explained the strange cargo.",
        "On the parcel wrapping, two details — … — …"
      ],
      [
        "Many passengers checked the colour of their case, though most forgot to check the name on the tag.",
        "Many customers checked the parcel’s address, though most …"
      ],
      [
        "Before opening the smallest compartment, Leni read the warning again.",
        "…, Arlo found a concert ticket inside the unfamiliar parcel. [inject a phrase that adds timing, place, manner or a complication]"
      ],
      [
        "With a luggage tag in one hand and a rubber duck in the other, Arlo rang the airport.",
        "With a parcel receipt in one hand and …"
      ],
      [
        "A plum-purple case waited beside the grey luggage belt.",
        "A vermilion-red trunk …"
      ],
      [
        "The lid sprang and knocked the lamp sideways.",
        "The luggage belt … [two precise actions]"
      ],
      [
        "A battered yellow suitcase rested beside the tall, varnished wardrobe.",
        "A … package blocked the … hallway."
      ],
      [
        "Instantly, the suitcase became a puzzle scattering questions across Leni’s bedroom.",
        "Gradually, the parcel became … [extend the metaphor]"
      ],
      [
        "The zipper snarled around a trapped sleeve.",
        "The trolley wheel … [sound and personification]"
      ],
      [
        "Leni sifted through the ducks, searching for an address.",
        "Arlo [rummaged / arranged] through the loose costumes, [tossing / folding] … [choose for a frantic search]"
      ]
    ],
    "gemmell": "The hotel room smelled of fresh sheets and warm carpet. Leni’s suitcase lay open beneath the window. Yellow ducks filled every corner, their painted eyes fixed on the ceiling. Traffic hummed outside. Under a folded dressing gown, something clicked. A duck rolled onto its side, revealing a tiny brass key taped beneath its belly.",
    "paragraphExercise": "Describe a mistakenly delivered parcel: establish the ordinary setting, add sensory details, show a small movement and end with an unexpected clue."
  },
  {
    "title": "Set 34",
    "theme": "The moon café",
    "activities": [
      [
        "Floating behind the counter, Jo caught a drifting cup, fastened it to the tray and poured the captain’s tea.",
        "Drifting through the space-station kitchen, the cook … [four linked actions]"
      ],
      [
        "The menu offered a vacuum-packed sandwich, a tube of tomato soup and a biscuit tethered to its plate.",
        "The astronaut’s lunch kit contained …"
      ],
      [
        "A skilled barista and an inexperienced astronaut, Jo made perfect coffee and forgot to secure the milk.",
        "A patient pilot and …, Rae …"
      ],
      [
        "Outside the window, two sights — a blue planet and a slow-moving satellite — interrupted the customers’ conversation.",
        "Beyond the airlock, two shapes — … — …"
      ],
      [
        "Many tourists ordered a floating milkshake, though most needed help catching the straw.",
        "Many passengers tried the weightless noodles, though most …"
      ],
      [
        "Without releasing the tray’s safety clip, Jo leaned towards the service hatch.",
        "…, Rae opened the cupboard of floating ingredients. [inject a phrase that adds timing, place, manner or a complication]"
      ],
      [
        "With a coffee pouch in one hand and a loose spoon in the other, Rae pushed away from the counter.",
        "With a repair kit in one hand and …"
      ],
      [
        "An ice-blue planet shone beyond the café window.",
        "A line of copper-gold lights …"
      ],
      [
        "The spoon spun and rebounded off the cupboard.",
        "The coffee droplets … [two precise actions]"
      ],
      [
        "A sealed silver pouch hovered above the round, bolted table.",
        "A … mug floated beside the … window."
      ],
      [
        "Gently, the café became an aquarium carrying its customers through the air.",
        "Slowly, the space kitchen became … [extend the metaphor]"
      ],
      [
        "The air filter sighed at another cloud of biscuit crumbs.",
        "The coffee machine … [sound and personification]"
      ],
      [
        "Jo snagged the spoon, pinning it beneath the tray’s elastic strap.",
        "Rae [nudged / hurled] the floating cup towards the counter, [guiding / launching] … [choose for controlled movement]"
      ]
    ],
    "gemmell": "The moon café smelled of coffee and warm electronics. Tables were bolted to the floor, but spoons travelled wherever they pleased. Earth glowed through the round window. The air filter hummed above the service hatch. A bead of milk drifted past Jo’s nose, catching the planet’s blue light. She opened her mouth and let it land on her tongue.",
    "paragraphExercise": "Describe a space-station kitchen: establish its atmosphere, develop sensory details, show a small weightless movement and end on an intimate final image."
  },
  {
    "title": "Set 35",
    "theme": "The missing mascot",
    "activities": [
      [
        "Vaulting the fence, Kai followed the feathers, opened the equipment shed and found the mascot eating the match ball.",
        "Slipping behind the grandstand, the captain … [four linked actions]"
      ],
      [
        "The shed held a deflated basketball, a stack of cracked cones and a goose wearing the team scarf.",
        "The changing room held …"
      ],
      [
        "A loyal supporter and an unreliable babysitter, Kai had promised to keep the goose away from the pitch.",
        "A determined captain and …, Bea …"
      ],
      [
        "Behind the bench, two clues — a chewed ribbon and a muddy webbed footprint — suggested trouble.",
        "Beside the trophy table, two clues — … — …"
      ],
      [
        "Many supporters cheered the mascot’s entrance, though most stopped when it chased the referee.",
        "Many players offered to feed the mascot, though most …"
      ],
      [
        "At the sound of the final whistle, the goose charged towards the referee.",
        "…, Bea noticed the referee’s empty whistle cord. [inject a phrase that adds timing, place, manner or a complication]"
      ],
      [
        "With a team scarf in one hand and a cabbage leaf in the other, Bea attempted a peaceful negotiation.",
        "With a whistle in one hand and …"
      ],
      [
        "A racing-green scarf trailed from the goose’s neck.",
        "A splash of marigold-yellow paint …"
      ],
      [
        "The goose lunged and snapped at the dangling whistle.",
        "The goalkeeper … [two precise actions]"
      ],
      [
        "A mud-spattered white goose stood beside the dented, half-open locker.",
        "A … jersey hung from the … hook."
      ],
      [
        "Suddenly, the sideline became a battlefield divided by a single angry goose.",
        "Gradually, the grandstand became … [extend the metaphor]"
      ],
      [
        "The whistle screamed for order above the honking.",
        "The scoreboard … [sound and personification]"
      ],
      [
        "Kai scooped up the scarf, keeping his fingers away from the beak.",
        "Bea [snatched / offered] the leaf towards the goose, [dangling / concealing] … [choose for coaxing it closer]"
      ]
    ],
    "gemmell": "The equipment shed smelled of mud and rubber. Footballs filled a wire cage, and orange cones leaned against the wall. Through the doorway came the crowd’s distant chant. A team scarf lay beneath the bench. Its striped end twitched. Then a white head rose between two boots, with the referee’s whistle hanging from its beak.",
    "paragraphExercise": "Describe a changing room hiding an escaped animal: atmosphere, sensory details, a small movement and a final image revealing what it has stolen."
  },
  {
    "title": "Set 36",
    "theme": "The echo rehearsal",
    "activities": [
      [
        "Creeping onto the stage, Sasha tested the microphone, heard her own whisper and froze beneath the spotlight.",
        "Tiptoeing into the recording booth, the singer … [four linked actions]"
      ],
      [
        "The rehearsal room contained a headless mannequin, a velvet curtain and a row of chairs facing the wall.",
        "The recording studio contained …"
      ],
      [
        "A confident actor and a superstitious stagehand, Sasha refused to rehearse until the ghost light was switched on.",
        "A talented singer and …, Eli …"
      ],
      [
        "Behind the curtain, two sounds — a dragging chain and a muffled laugh — spoiled the silence.",
        "Beyond the studio door, two noises — … — …"
      ],
      [
        "Many actors claimed not to fear the dark, though most volunteered for the scenes with daylight.",
        "Many musicians laughed at the ghost story, though most …"
      ],
      [
        "Without stepping beyond the pool of light, Sasha called into the wings.",
        "…, Eli heard his name through the studio headphones. [inject a phrase that adds timing, place, manner or a complication]"
      ],
      [
        "With a script in one hand and a torch in the other, Eli checked behind the backdrop.",
        "With a microphone in one hand and …"
      ],
      [
        "A bruised-purple shadow lay across the empty stage.",
        "A wash of honey-gold light …"
      ],
      [
        "The curtain billowed and snagged on the mannequin’s arm.",
        "The loose chain … [two precise actions]"
      ],
      [
        "A frayed velvet curtain concealed the narrow, draughty passage.",
        "A … mask rested on the … stool."
      ],
      [
        "Slowly, the silence became a tightrope carrying Sasha towards her next word.",
        "Suddenly, the echo became … [extend the metaphor]"
      ],
      [
        "The stage answered her whisper with a long wooden groan.",
        "The studio door … [sound and personification]"
      ],
      [
        "Sasha eased the curtain aside, probing the gap with her torch.",
        "Eli [bellowed / murmured] into the microphone, [filling / barely disturbing] … [choose for a quiet test]"
      ]
    ],
    "gemmell": "The theatre was empty except for Sasha. A single lamp lit the centre of the stage, leaving the seats in darkness. Dust smelled warm beneath the light. A chain tapped somewhere above the curtain. Sasha set down her script. In the front row, a seat folded slowly upwards, as if someone had just stood to leave.",
    "paragraphExercise": "Describe an empty recording studio: establish atmosphere, develop sensory details, show a small movement and finish with something that invites an explanation."
  },
  {
    "title": "Set 37",
    "theme": "The tiny detective",
    "activities": [
      [
        "Sliding under the cupboard, Pip examined the crumbs, measured a footprint and accused the hamster of stealing breakfast.",
        "Squeezing behind the skirting board, the miniature detective … [four linked actions]"
      ],
      [
        "The mouse-sized office held a bottle-cap desk, a stamp-sized rug and a pencil sharpened at both ends.",
        "The fairy-sized workshop held …"
      ],
      [
        "A meticulous detective and a hopeless climber, Pip solved the case before escaping from the cereal box.",
        "A brilliant inventor and …, Kit …"
      ],
      [
        "Under the table, two traces — a trail of oats and a smear of jam — led towards the radiator.",
        "Behind the toaster, two clues — … — …"
      ],
      [
        "Many tiny detectives feared the cat, though most feared the vacuum cleaner more.",
        "Many garden fairies disliked the rain, though most …"
      ],
      [
        "Using a bent paperclip as a grappling hook, Pip climbed onto the breakfast table.",
        "…, Kit spotted a trail of soil across the giant windowsill. [inject a phrase that adds timing, place, manner or a complication]"
      ],
      [
        "With a crumb in one hand and a thread in the other, Kit crossed the gap between the chairs.",
        "With a thimble in one hand and …"
      ],
      [
        "A butter-yellow crumb towered above the detective’s boots.",
        "A drop of blackberry-purple juice …"
      ],
      [
        "The hamster gnawed and shredded the corner of the evidence bag.",
        "The miniature detective … [two precise actions]"
      ],
      [
        "A bent steel pin rested beside the huge, sticky jam jar.",
        "A … button lay beneath the … boot."
      ],
      [
        "Suddenly, the breakfast table became a continent stretching beyond Pip’s torchlight.",
        "Gradually, the garden became … [extend the metaphor]"
      ],
      [
        "The toaster growled and spat two slices into the air.",
        "The fridge … [sound and personification]"
      ],
      [
        "Pip scaled the bread crust, anchoring the thread around a seed.",
        "Kit [scrambled / strolled] up the steep cereal box, [clutching / admiring] … [choose for a difficult climb]"
      ]
    ],
    "gemmell": "The kitchen floor was an enormous country to Pip. Chair legs rose like towers, and a fallen spoon stretched across the tiles. The air smelled of toast and strawberry jam. Above him, the fridge rumbled. A crumb shifted beside the cupboard. From underneath it emerged two whiskers, followed by a nose dusted with the breakfast evidence.",
    "paragraphExercise": "Describe a garden from a tiny character’s viewpoint: establish scale, develop sensory details, show a small movement and finish with a revealing close-up."
  },
  {
    "title": "Set 38",
    "theme": "The broken time machine",
    "activities": [
      [
        "Stumbling out of the capsule, Dev checked his watch, brushed snow from his shoes and recognised his own birthday cake.",
        "Tumbling through the portal, the traveller … [four linked actions]"
      ],
      [
        "The capsule carried a cracked compass, a calendar with no dates and a seatbelt tied in a knot.",
        "The traveller’s emergency bag contained …"
      ],
      [
        "A gifted scientist and a terrible timekeeper, Dr Moss arrived late for the invention of yesterday.",
        "A careful researcher and …, Suri …"
      ],
      [
        "On the kitchen table, two details — an untouched cake and a familiar birthday card — made Dev stop.",
        "On the station platform, two details — … — …"
      ],
      [
        "Many travellers wanted to visit the future, though most packed clothes for the weather they had left.",
        "Many inventors tested the return button, though most …"
      ],
      [
        "Before the clock could strike the same hour again, Dev unplugged the capsule.",
        "…, Suri recognised the date on the station clock. [inject a phrase that adds timing, place, manner or a complication]"
      ],
      [
        "With a cracked watch in one hand and a warm birthday candle in the other, Suri studied the date.",
        "With a train ticket in one hand and …"
      ],
      [
        "A mercury-silver ripple widened around the capsule.",
        "A flash of glacier-blue light …"
      ],
      [
        "The clock stuttered and lurched backwards by a minute.",
        "The portal … [two precise actions]"
      ],
      [
        "A frost-covered metal capsule stood beside the small, familiar kitchen table.",
        "A … suitcase waited on the … platform."
      ],
      [
        "Gradually, time became a staircase folding back beneath Dev’s feet.",
        "Suddenly, memory became … [extend the metaphor]"
      ],
      [
        "The clock hiccupped at the same second three times.",
        "The old watch … [sound and personification]"
      ],
      [
        "Dev prised the cover loose, exposing the trembling gears.",
        "Suri [slammed / eased] the dial towards yesterday, [jolting / coaxing] … [choose for a cautious adjustment]"
      ]
    ],
    "gemmell": "The kitchen smelled of candles and icing. A birthday cake waited in the centre of the table, untouched except for one missing strawberry. Dev’s schoolbag hung from its usual hook. The clock ticked, stopped and ticked again. A strawberry rolled from beneath the capsule. It came to rest exactly where Dev remembered dropping it yesterday.",
    "paragraphExercise": "Describe a familiar railway platform reached through a faulty time machine: atmosphere, sensory details, small movement and an image suggesting repeated time."
  },
  {
    "title": "Set 39",
    "theme": "The lost island radio",
    "activities": [
      [
        "Climbing the lookout, Mara raised the aerial, tuned the receiver and heard someone whisper her name.",
        "Scrambling onto the wreck’s roof, the castaway … [four linked actions]"
      ],
      [
        "The shelter contained a patched raincoat, a tin of bent nails and a radio wrapped in seaweed.",
        "The wreck’s cabin contained …"
      ],
      [
        "A resourceful sailor and a stubborn optimist, Mara repaired the radio with wire from her necklace.",
        "A skilled mechanic and …, Sol …"
      ],
      [
        "Through the static, two sounds — a repeated number and a faint bell — interrupted the hiss.",
        "Beyond the headland, two signals — … — …"
      ],
      [
        "Many ships passed the island, though most stayed too far away to see the smoke.",
        "Many rescuers searched the main beach, though most …"
      ],
      [
        "After three days of hearing only static, Mara recognised a voice.",
        "…, Sol switched on the wreck’s emergency beacon. [inject a phrase that adds timing, place, manner or a complication]"
      ],
      [
        "With a radio in one hand and a broken aerial in the other, Sol climbed towards the lookout.",
        "With a flare in one hand and …"
      ],
      [
        "A strip of jade-green water separated the island from the reef.",
        "A line of pearl-grey mist …"
      ],
      [
        "The aerial whipped and scraped against the mast.",
        "The signal flare … [two precise actions]"
      ],
      [
        "A salt-stained canvas shelter leaned beneath the low, wind-bent palms.",
        "A … radio rested on the … crate."
      ],
      [
        "Relentlessly, the sea became a wall shutting Mara away from every passing ship.",
        "Slowly, the mist became … [extend the metaphor]"
      ],
      [
        "The radio muttered through its teeth of static.",
        "The damaged boat … [sound and personification]"
      ],
      [
        "Mara cupped the receiver, straining to separate the voice from the hiss.",
        "Sol [scanned / admired] the horizon, [searching / decorating] … [choose for a lookout’s attention]"
      ]
    ],
    "gemmell": "The island’s lookout smelled of salt and crushed leaves. Mara’s shelter lay below, its patched roof snapping in the wind. White water broke along the reef. The radio hissed beside her boot. She turned the dial a fraction. Between two bursts of static, a bell rang three times, and a voice began counting backwards from ten.",
    "paragraphExercise": "Describe a wreck’s cabin with a working radio: establish isolation, develop sensory details, introduce a small adjustment and finish with an unexplained signal."
  },
  {
    "title": "Set 40",
    "theme": "The last game token",
    "activities": [
      [
        "Dodging the closing gate, Owen reached the machine, inserted his last token and watched the screen spell his name.",
        "Slipping into the empty bowling alley, the late player … [four linked actions]"
      ],
      [
        "The arcade corner held a cracked racing seat, a flickering claw machine and a cabinet with no power cable.",
        "The abandoned games room held …"
      ],
      [
        "A talented gamer and an impatient reader, Owen pressed START before finishing the warning.",
        "A skilled bowler and …, Tess …"
      ],
      [
        "Above the controls, two messages — ONE LIFE LEFT and THIS IS NOT A GAME — flashed in turn.",
        "Across the scoreboard, two messages — … — …"
      ],
      [
        "Many players reached the final level, though most left before the screen asked a question.",
        "Many visitors tried the mystery machine, though most …"
      ],
      [
        "Without touching the glowing button, Owen leaned closer to the screen.",
        "…, Tess watched the bowling pins rise without their strings. [inject a phrase that adds timing, place, manner or a complication]"
      ],
      [
        "With a token in one hand and a torn ticket in the other, Tess searched for the exit.",
        "With a scorecard in one hand and …"
      ],
      [
        "A neon-lime arrow pulsed beneath the black screen.",
        "A row of hot-pink lights …"
      ],
      [
        "The cabinet vibrated and swallowed the token.",
        "The bowling ball … [two precise actions]"
      ],
      [
        "A scratched plastic button glowed beneath the dark, dust-streaked screen.",
        "A … ticket protruded from the … slot."
      ],
      [
        "Suddenly, the screen became a window opening onto Owen’s own street.",
        "Gradually, the game became … [extend the metaphor]"
      ],
      [
        "The machine chuckled in a crackle of broken music.",
        "The ticket dispenser … [sound and personification]"
      ],
      [
        "Owen jabbed the button, hammering it twice before the screen changed.",
        "Tess [tapped / battered] the glass, [testing / splintering] … [choose for a cautious check]"
      ]
    ],
    "gemmell": "The arcade was quiet after closing. Blue screens lit the carpet, and the air smelled of dust and old popcorn. A racing wheel turned by itself, clicking at each spoke. Owen held one token against his palm. At the end of the room, a dark machine woke. Its screen showed the arcade from above, including the small boy who had just looked up.",
    "paragraphExercise": "Describe an empty bowling alley where a machine behaves unexpectedly: atmosphere, sensory details, a small movement and a final image involving the observer."
  }
];

function buildActivities(set: SetItem) {
  return set.activities.map(([reference, exercise], index) => ({
    ...ACTIVITY_META[index],
    reference,
    exercise
  }));
}

/** Literal Tailwind classes only — dynamic strings are not detected by Tailwind’s scanner. */
const REFERENCE_TEXT_CLASS: Record<string, string> = {
  "bg-blue-700": "text-blue-300",
  "bg-emerald-700": "text-emerald-300",
  "bg-red-700": "text-red-300",
  "bg-orange-700": "text-orange-300",
  "bg-purple-700": "text-purple-300",
  "bg-pink-700": "text-pink-300",
  "bg-cyan-700": "text-cyan-300",
  "bg-amber-700": "text-amber-300",
  "bg-lime-700": "text-lime-300",
  "bg-indigo-700": "text-indigo-300",
  "bg-fuchsia-700": "text-fuchsia-300",
  "bg-sky-700": "text-sky-300",
  "bg-teal-700": "text-teal-300",
  "bg-slate-700": "text-slate-300"
};

function referenceTextClass(headerBg: string) {
  return REFERENCE_TEXT_CLASS[headerBg] ?? "text-zinc-300";
}

type CardActivity = {
  id?: number;
  name: string;
  colour: string;
  hint: string;
  reference: string;
  exercise: string;
};

function ActivityCard({
  activity,
  contentFontSize,
  wide = false
}: {
  activity: CardActivity;
  contentFontSize: number;
  wide?: boolean;
}) {
  const [answer, setAnswer] = useState("");
  const [showReference, setShowReference] = useState(true);
  const [showInput, setShowInput] = useState(false);

  const bodyText = wide ? "text-[1em] leading-snug" : "text-[1.125em] leading-snug";

  return (
    <section className={`overflow-hidden rounded-2xl border border-white/10 bg-zinc-950 shadow-xl shadow-black/30 ${wide ? "lg:col-span-2" : ""}`}>
      <div className={`${activity.colour} flex items-center justify-between gap-3 px-4 py-2`}>
        <div className="flex min-w-0 flex-1 items-center gap-2">
          <span className="shrink-0 text-xs font-semibold uppercase tracking-wide text-white/70">
            {wide ? "Paragraph" : `Activity ${activity.id}`}
          </span>
          <h2 className="min-w-0 truncate text-base font-bold leading-tight text-white">{activity.name}</h2>
        </div>
        <button
          type="button"
          onClick={() => setShowReference((value) => !value)}
          className="shrink-0 rounded-lg bg-white/15 px-3 py-1 text-xs font-semibold text-white hover:bg-white/25"
        >
          {showReference ? "Hide" : "Show"}
        </button>
      </div>

      <div
        className={`grid gap-0 ${wide ? "grid-cols-[1.2fr_0.8fr]" : "grid-cols-2"}`}
        style={{ fontSize: `${contentFontSize}px` }}
      >
        <div className="border-r border-white/10 bg-zinc-900/80 p-4">
          <p className="mb-2 text-xs font-bold uppercase tracking-wide text-zinc-400">Reference</p>
          {showReference ? (
            <p className={`${bodyText} ${referenceTextClass(activity.colour)}`}>{activity.reference}</p>
          ) : (
            <p className="text-[1.125em] italic leading-snug text-zinc-600">Reference hidden</p>
          )}
        </div>

        <div className="bg-zinc-950 p-4">
          <div className="mb-2 flex items-center justify-between gap-3">
            <p className="text-xs font-bold uppercase tracking-wide text-zinc-400">Your turn</p>
            <button
              onClick={() => setShowInput((value) => !value)}
              className="rounded-lg border border-white/10 bg-zinc-900 px-2 py-1 text-sm font-bold text-zinc-300 hover:bg-zinc-800"
              aria-label="Toggle student response box"
            >
              {showInput ? "⌃" : "⌄"}
            </button>
          </div>
          <p className={`${bodyText} mb-3 text-white`}>{activity.exercise}</p>
          {showInput && (
            <>
              <textarea
                value={answer}
                onChange={(event) => setAnswer(event.target.value)}
                placeholder={wide ? "Write the paragraph here..." : "Finish the sentence here..."}
                className={`${wide ? "min-h-40" : "min-h-24"} w-full resize-none rounded-xl border border-white/10 bg-zinc-900 p-3 text-[1em] text-white outline-none ring-0 placeholder:text-zinc-600 focus:border-violet-400`}
              />
              <p className="mt-2 text-[0.75em] leading-snug text-zinc-500">{activity.hint}</p>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

export default function ProStemsApp() {
  const [fontSize, setFontSize] = useState(18);
  const [topic, setTopic] = useState(DATA.topic);
  const [transferTopic, setTransferTopic] = useState("Set 21");
  const [bank, setBank] = useState<"original" | "transfer">("original");

  const currentSet: SetItem = bank === "original"
    ? SETS.find((set) => set.title === topic) || SETS[0]
    : TRANSFER_SETS.find((set) => set.title === transferTopic) || TRANSFER_SETS[0];
  const activities = useMemo(() => buildActivities(currentSet), [currentSet]);

  const gemmellActivity = currentSet.gemmell
    ? {
        name: "Gemmell Paragraph",
        colour: "bg-slate-700",
        reference: currentSet.gemmell,
        exercise: currentSet.paragraphExercise ?? "Recreate your own paragraph using the same pattern: place, atmosphere, sensory detail, small movement, and final image.",
        hint: "Build a short descriptive paragraph, not just one sentence."
      }
    : null;

  return (
    <main className="min-h-screen bg-[#10131f]">
      <header className="sticky top-0 z-10 border-b border-white/10 bg-[#10131f]/95 px-4 py-3 backdrop-blur">
        <div className="flex w-full flex-wrap items-center gap-4">
          <div className="flex min-w-48 items-baseline gap-3">
            <h1 className="text-2xl font-black tracking-tight text-white">{DATA.title}</h1>
            <p className="text-sm text-zinc-400">{DATA.subtitle}</p>
          </div>

          <label className="flex min-w-0 flex-wrap items-center gap-2 text-sm">
            <span className="shrink-0 uppercase tracking-wide text-zinc-500">Original 1–20</span>
            <div className="w-[10%] min-w-[6.5rem] shrink-0">
              <select
                value={topic}
                aria-label="Original sets 1 to 20"
                onFocus={() => setBank("original")}
                onChange={(event) => { setTopic(event.target.value); setBank("original"); }}
                className="w-full rounded-lg border border-white/10 bg-zinc-900 px-2 py-2 text-white"
              >
                {SETS.map((set) => (
                  <option key={set.title}>{set.title}</option>
                ))}
              </select>
            </div>
          </label>

          <label className="flex min-w-0 flex-wrap items-center gap-2 text-sm">
            <span className="shrink-0 uppercase tracking-wide text-zinc-500">Transfer 21–40</span>
            <select
              value={transferTopic}
              aria-label="Transfer sets 21 to 40"
              onFocus={() => setBank("transfer")}
              onChange={(event) => { setTransferTopic(event.target.value); setBank("transfer"); }}
              className="max-w-72 rounded-lg border border-white/10 bg-zinc-900 px-2 py-2 text-white"
            >
              {TRANSFER_SETS.map((set) => (
                <option key={set.title} value={set.title}>{set.title} · {set.theme}</option>
              ))}
            </select>
          </label>
          <div className="ml-auto flex items-center gap-2">
            <button
              type="button"
              onClick={() => setFontSize((size) => Math.max(16, size - 1))}
              className="rounded-lg border border-white/10 bg-zinc-900 px-3 py-1 text-sm font-bold text-white hover:bg-zinc-800"
            >
              A−
            </button>
            <span className="w-12 text-center text-sm text-zinc-400">{fontSize}px</span>
            <button
              type="button"
              onClick={() => setFontSize((size) => Math.min(26, size + 1))}
              className="rounded-lg border border-white/10 bg-zinc-900 px-3 py-1 text-sm font-bold text-white hover:bg-zinc-800"
            >
              A+
            </button>
          </div>
        </div>
      </header>

      <div className="px-4 pt-3 text-sm text-zinc-300" aria-live="polite">
        {currentSet.title}{currentSet.theme ? ` · ${currentSet.theme} · Craft transfer` : " · Original practice"}
      </div>
      <div className="grid grid-cols-1 gap-4 p-4 lg:grid-cols-2">
        {activities.map((activity) => (
          <ActivityCard key={`${currentSet.title}-${activity.id}`} activity={activity} contentFontSize={fontSize} />
        ))}
        {gemmellActivity && <ActivityCard key={`${currentSet.title}-paragraph`} activity={gemmellActivity} contentFontSize={fontSize} wide />}
      </div>
    </main>
  );
}

