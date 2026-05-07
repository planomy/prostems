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

type SetItem = (typeof SETS)[number];

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
    <section className={`overflow-hidden rounded-2xl border border-white/10 bg-zinc-950 shadow-xl shadow-black/30 ${wide ? "col-span-2" : ""}`}>
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

  const currentSet = SETS.find((set) => set.title === topic) || SETS[0];
  const activities = useMemo(() => buildActivities(currentSet), [currentSet]);

  const gemmellActivity = currentSet.gemmell
    ? {
        name: "Gemmell Paragraph",
        colour: "bg-slate-700",
        reference: currentSet.gemmell,
        exercise: "Recreate your own paragraph using the same pattern: place, atmosphere, sensory detail, small movement, and final image.",
        hint: "Build a short descriptive paragraph, not just one sentence."
      }
    : null;

  return (
    <main className="min-h-screen bg-[#10131f]">
      <header className="sticky top-0 z-10 border-b border-white/10 bg-[#10131f]/95 px-4 py-3 backdrop-blur">
        <div className="flex w-full items-center gap-4">
          <div className="flex min-w-48 items-baseline gap-3">
            <h1 className="text-2xl font-black tracking-tight text-white">{DATA.title}</h1>
            <p className="text-sm text-zinc-400">{DATA.subtitle}</p>
          </div>

          <label className="flex min-w-0 items-center gap-2 text-sm">
            <span className="shrink-0 uppercase tracking-wide text-zinc-500">Topic</span>
            <div className="w-[10%] min-w-[6.5rem] shrink-0">
              <select
                value={topic}
                onChange={(event) => setTopic(event.target.value)}
                className="w-full rounded-lg border border-white/10 bg-zinc-900 px-2 py-2 text-white"
              >
                {SETS.map((set) => (
                  <option key={set.title}>{set.title}</option>
                ))}
              </select>
            </div>
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

      <div className="grid grid-cols-2 gap-4 p-4">
        {activities.map((activity) => (
          <ActivityCard key={activity.id} activity={activity} contentFontSize={fontSize} />
        ))}
        {gemmellActivity && <ActivityCard activity={gemmellActivity} contentFontSize={fontSize} wide />}
      </div>
    </main>
  );
}
