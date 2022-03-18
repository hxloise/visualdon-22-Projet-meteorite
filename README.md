# Projet visualisation de données 

Travail réalisé par : **Cuche Héloïse & Molano Jasmine** 

Wireframe : [Découvrir le projet sur Figma](https://www.figma.com/team_invite/redeem/I2vBXDwGePvZmXWVHCEMRF) 

## Thématique

**Source de données** : [Meteorite Landings](https://www.kaggle.com/nasa/meteorite-landings).(Format SVG)
[Hot 100 songs, Year end charts](https://www.billboard.com/charts/year-end/2006/hot-100-songs/)

**Contexte** : [la Meteoritical Society](https://meteoritical.org/) collecte des données sur les météorites tombées sur Terre depuis l'espace. Cet ensemble de données comprend l'emplacement, la masse, la composition et l'année de chute de plus de 45 000 météorites qui ont frappé notre planète. À noter que le propriétaire de ce dataset est la Nasa et que la dernière modification a eu lieu le 05-11-2016.

Le Billboard est un magazine américain consacré à l'industrie de la musique, il classe au quotidien le top des chansons les plus écoutées.

**Description** : 
* Name (str) : le nom de la météorite (généralement un emplacement, souvent modifié par un numéro, une année, une composition, etc.) 
* Id (int) : identifiant unique pour la météorite
* NameType (valid, relict): 
  * Valid : indique que la météorite est en bon état
  * Relict : indique qu'une une météorite qui a été fortement dégradée par les conditions météorologiques sur terre 
* Mass (float) : la masse de la météorite [en grammes]
* Fall (fellm found): 
  * Fell : indique si la chute de la météorite a été observée
  * Found : indique si la chute de la météorite n'a pas été observée
* Reclass (str): classe de la météorite (caractéristique physique, chimique, autre)
* Year (date) : l'année où la météorite est tombée, ou l'année où elle a été trouvée.
* Reclat (float): la latitude d'atterrissage de la météorite
* Reclong (float): la longitude de l'atterrissage de la météorite
* GeoLocation (float): réunis la latitude et la longitude


**But** : Notre objectif est d'explorer en créant des relations absurdes entre deux jeux de données différents. Au-delà de l'ironie, amenant une touche de divertissement au monde scientifique, nous souhaitons présenter des données purement factuelles sur les météorites. Notre projet présentera 10 ans de données sur l'atterrissage de météorite ainsi que les top musicaux de ces différentes années. 

**Références** : 
* [Getting to know the meteorites par Hannah Yan Han](https//towardsdatascience.com/getting-to-know-the-meteorites-ef4a6a04290c)
But: Classifier la masse des météorites par année et position géographique de l'atterrissage.

* [How to design a meteorite infographic using NASA data and SAS](https://blogs.sas.com/content/sascom/2017/03/28/design-meteorite-infographic-using-nasa-data-sas/)
But: Tutoriel sur la mise en page de rapport visuel et infographique. Ici, il montre combien de météorites ont atteri sur terre ces 4000 dernières années, quelle est leur masse et leur géolocalisation.

* [Watching the Sky Fall: Visualizing a Century of Meteorites par Tiffany Farrant-Gonzalez](https://www.visualcapitalist.com/watching-the-sky-fall-visualizing-a-century-of-meteorites/)
But: Un sicècle de météorites observées, classé par année de chute, masse et lieu d'atterrissage sur Terre.
