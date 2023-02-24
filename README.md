# 🚀 Beneficiosi Clients Frontend
## Tecnologías
* [Node.js](#item1)
* [React JS](#item2)
* [TailwindCSS](#item3)
## Instalación
```
git clone https://github.com/Tecsoe/beneficiosi-clients-front.git
cd beneficiosi-clients-front
npm install
cp .env-example .env
```
Configurar variables de entorno en el archivo .env
```
npm run start
```
## Componentes
* [dicounts](#item4)
* [DiscountStoreCard.js](#item5)
* [DiscountsSlider.js](#item6)
* [AppLayout.js](#item7)
* [CardIssuersList.js](#item8)
* [CardsList.js](#item9)
* [Container.js](#item10)
* [Footers.js](#item11)
* [LeftSidebarLayout.js](#item12)
* [NavLinks.js](#item13)
* [NavSearchBar.js](#item14)
* [Navbar.js](#item15)
* [PageLogo.js](#item16)
* [RatingsFilter.js](#item17)
* [SelectCardsList.js](#item18)
* [SelectUserToLogin.js](#item19)
* [StoreDiscountCard.js](#item20)
* [StoreFeatureFilter.js](#item21)
* [StoreInfo.js](#item22)
* [TagsFilter.js](#item23)
* [TagsFilterPrecio.js](#item24)
* [DiscountModal.js](#item25)
* [Map.js](#item26)
* [BolichesFeaturedProducts.js](#item27)
* [BussinessSection.js](#item28)
* [CategoryFilter.js](#item29)
* [CategorySectionCard.js](#item30)
* [CategoryDetailsCard.js](#item31)
* [CheckoutDetailsCard.js](#item32)
* [CustomInput.js](#item33)
* [FeaturedStores.js](#item34)
* [GastronomyFeaturedProducts.js](#item35)
* [HomeSlider.js](#item36)
* [MobileAppSection.js](#item37)
* [NecessaryInfo.js](#item38)
* [Pagination.js](#item39)
* [PharmacyFeaturedProducts.js](#item40)
* [ProductAdCard.js](#item41)
* [ProductCard.js](#item42)
* [ProductHorizontalCard.js](#item43)
* [ProductImagesCarousel.js](#item44)
* [ProductModal.js](#item45)
* [ProductProfile.js](#item46)
* [ProductsAdsSlider.js](#item47)
* [ProductsCollection.js](#item48)
* [ProductsFilters.js](#item49)
* [ProductsGrid.js](#item50)
* [QuestionsAnswer.js](#item51)
* [SearchAddressFilter.js](#item52)
* [SearchInputMobile.js](#item53)
* [SectionHeading.js](#item54)
* [Select.js](#item55)
* [SelectDeliverySection.js](#item56)
* [SelectGridMode.js](#item57)
* [ShareIcon.js](#item58)
* [ShowsFeaturedProducts.js](#item59)
* [StarIcon.js](#item60)
* [StoreCard.js](#item61)
* [StoreCategoryFilter.js](#item62)
* [StoreHorizontalCard.js](#item63)
* [StoresCollection.js](#item64)
* [StoresFilters.js](#item65)
* [SuperMarketsFeaturedProducts.js](#item66)
* [TableBody.js](#item67)
* [TableCell.js](#item68)
* [TableHead.js](#item69)
* [TableRow.js](#item80)
* [TextField.js](#item81)
* [UserAddressCard.js](#item82)
* [Componente usado para la informacion de las direcciones del cliente](#item83)
* [VideoComponent.js](#item84)
* [WhatsappIcon.js](#item85)
* [WidgetComponent.js](#item86)
* [logOutModal.js](#item87)
* [statCard.js](#item88)
* [StoreNewPost.js](#item89)
* [Checkbox.js](#item90)
* [TabContainer.js](#item91)


<a name="item4"></a>
### dicounts
---
Carpeta Principal que se encarga del contener los componentes de Descuento aplicado en la pagina de Beneficio.

[Subir](#top)

<a name="item5"></a>
### DiscountStoreCard.js
---
Componente donde se visualiza informacion de la tienda con su respectivo descuento y los agencias afiliadas a este beneficio

![](https://i.imgur.com/uJOv7jl.png)
[Subir](#top)

<a name="item6"></a>
### DiscountsSlider.js
---
Componente encargado del diseño del swiper del componente creado.
![](https://i.imgur.com/R95hlvr.png)
[Subir](#top)

<a name="item7"></a>
### AppLayout.js
---
Es un componente padre de enrutamiento entre los hijos Navbar y Footer. Este contiene una variable que permite agregar el contenido correspondiente a casa pagina de la aplicacion.

[Subir](#top)

<a name="item8"></a>
### CardIssuersList.js
---
Componente que contiene las diferentes cards de las agencias bancarias y supermercados entes con el respectivo descuento.

![](https://i.imgur.com/FxlH1yr.png)
[Subir](#top)

<a name="item9"></a>
### CardsList.js
---
Componente donde muestra las diferentes tarjetas de sus agencias bancarias respectivas.

![](https://i.imgur.com/dqLmVYV.png)
[Subir](#top)

<a name="item10"></a>
### Container.js
---
Componente de navegacion que contine las diferentes categorias del marketplace como gastronomia espectaculos supermercados boliches y farmacias.

![](https://i.imgur.com/IfTKKfy.png)
[Subir](#top)


<a name="item11"></a>
### Footers.js
---
Componente encargado para la vista del pie de pagina del sitio, contiene elementos para el redirecionamiento de las redes del sitio como Facebook, Twitter, Instagram, Youtube.

![](https://i.imgur.com/xBPihZX.png)
[Subir](#top)

<a name="item12"></a>
### LeftSidebarLayout.js
---
Componente padre que contiene los elementos del sidebar y del body de la pagina donde se pueden apreciar las agencias bancarias los supermecados entes y tiendas.

![](https://i.imgur.com/RDdV2Ax.png)
[Subir](#top)

<a name="item13"></a>
### NavLinks.js
---
Componente que contiene los botones de Comprar ayuda y ingresar.

![](https://i.imgur.com/T25jQZT.png)
[Subir](#top)

<a name="item14"></a>
### NavSearchBar.js
---
Componente que contiene los botones de buscar.

![](https://i.imgur.com/xBPihZX.png)
[Subir](#top)

<a name="item15"></a>
### Navbar.js
---
Contiene la parte superior del header donde se ubica los items que direcciona la navegación del usuario que contiene el componente NavLinks, NavSearchBar. Tambien esta compuesto por la franga roja que contiene localizacion, ofretas, servicios y comercios.

![](https://i.imgur.com/sQH93oK.png)
[Subir](#top)

<a name="item16"></a>
### PageLogo.js
---
Componete encargado de clasificar el ratin de la busqueda, en en el sitio, que varia desde un rango desde el mas valorado hast ael menos valorado.

![](https://i.imgur.com/0PD6ZOW.png)
[Subir](#top)

<a name="item17"></a>
### RatingsFilter.js
---
Componente donde si visualiza informacion de la tienda con su respectivo descuento y los agencias afiliadas a este beneficio.

![](https://i.imgur.com/kzIls4O.png)
[Subir](#top)

<a name="item18"></a>
### SelectCardsList.js
---
Titulación de las secciones. Recibe parametro de texto modificable, debido a que se utiliza en varias secciones del Home.

![](https://i.imgur.com/X28kSxn.png)
[Subir](#top)

<a name="item19"></a>
### SelectUserToLogin.js
---
Componente encargado del diseño de seleccion de si eres user o tienda.

![](https://i.imgur.com/IoXxBH0.png)
[Subir](#top)

<a name="item20"></a>
### StoreDiscountCard.js
---
Componente que filtra resultados por preferencia ya sea por wifi, parques para niños, estacionamientos.

![](https://i.imgur.com/NzCfUIz.png)
[Subir](#top)

<a name="item21"></a>
### StoreFeatureFilter.js
---
Componente que filtra resultados por preferencia ya sea por wifi, parques para niños, estacionamientos.

![](https://i.imgur.com/Ef5YO1W.png)
[Subir](#top)

<a name="item22"></a>
### StoreInfo.js

Componente con una descripcion de la informacion de la tienda telefono y sus respectivas redes sociales Facebook Instagram y Whatsapp.

![](https://i.imgur.com/j7pHNdg.png)
[Subir](#top)

<a name="item23"></a>
### TagsFilter.js

Componente mediante el cual cumple la funcion de filtrar los items por sus respectivas etiquetas, ya sea por bebidas, comida rapida, alimentos , estacionamiento.

![](https://i.imgur.com/iLIWI2V.png)
[Subir](#top)

<a name="item24"></a>
### TagsFilters.js

Componete donde se visualiza y cumple la funcion de visualizar y filtrar los minimos y los maximos de los precios de sus productos

![](https://i.imgur.com/5204kLy.png)
[Subir](#top)

<a name="item25"></a>
### DiscountModal.js

Componete usado para una ventana emergente para la visualizacion de los bancos afiliados en el descuento de una tienda.

![](https://i.imgur.com/HoXCy37.png)
[Subir](#top)

<a name="item26"></a>
### Map.js

Compoente encargado de añadir la ubicacion geografica del cliente y a su vez realizar la busqueda de tiendas por geolocalizacion

![](https://i.imgur.com/cxtPEfR.png)
[Subir](#top)

<a name="item27"></a>
### BolichesFeaturedProducts.js

Componente que muestra los productos mas destacados de la categoria boliches.

![](https://i.imgur.com/EjXNYwT.png)
[Subir](#top)

<a name="item28"></a>
### BussinessSection.js

Componente que se encarga de invitar al usuario a registrarse ya sea como usuario cliente o venderdor para disfrutar de los diferentes beneficios que ofrece el marketplace.

![](https://i.imgur.com/vessPc9.png)
[Subir](#top)

<a name="item29"></a>
### CategoryFilter.js

Componete que filtra las categorias correspondientes dependiendo la tienda si es un cine filtra la categoria por tipo de peliculas, si es un ienda de informatica seria por productos.

![](https://i.imgur.com/Dlx3yNt.png)
[Subir](#top)

<a name="item30"></a>
### CategorySectionCard.js

Componente que muestra de una manera dinamica las difetentes categorias del sitio, donde se redirecciona a la vitrina de productos.

[Subir](#top)

<a name="item31"></a>
### CheckoutDetailsCard.js

Componente donde se visualiza los detalles del descuento por la compra del producto, detalles de la compra y direccion de la tienda.

![](https://i.imgur.com/PVDlrBd.png)
[Subir](#top)

<a name="item32"></a>
### CustomInput.js

Componente que se utiliza como un campo de texto para indexar la busqueda de lo que se requiere.

![](https://i.imgur.com/E15zsgP.png)
[Subir](#top)

<a name="item33"></a>
### FeaturedStores.js

Componente que muestra todas las tiendas destacadas del marketplace.

![](https://i.imgur.com/aRYpCAt.png)
[Subir](#top)

<a name="item34"></a>
### GastronomyFeaturedProducts.js

Componente encargado de mostrar los productos destacados de la categoria de Gatronomia.

![](https://i.imgur.com/gf8Hg5x.png)
[Subir](#top)

<a name="item35"></a>
### HomeSlider.js

Componente que me mediante el swiper muestra diferentes imagenes de los tiendas que ofrecen sus servicios y productos.

![](https://i.imgur.com/kXZWM8V.png)
[Subir](#top)

<a name="item36"></a>
### MobileAppSection.js

Es un componete dedicado para informacion o algo que el administrador del sitio requiera colocar.

![](https://i.imgur.com/dRwiWeA.png)
[Subir](#top)

<a name="item37"></a>
### NecessaryInfo.js

Componente con informacion relevante sobre la seguridad y soporte del marketplace

![](https://i.imgur.com/aHSs5dc.png)
[Subir](#top)

<a name="item38"></a>
### Pagination.js

Componente encargado de la navegacion entre paginas de los productos por vista.

![](https://i.imgur.com/p3vfyZd.png)
[Subir](#top)

<a name="item39"></a>
### PharmacyFeaturedProducts.js

Componente que muestra los productos destacados de la Categoria Farmacia

![](https://i.imgur.com/JC6Q1S3.png)
[Subir](#top)

<a name="item40"></a>
### ProductAdCard.js

Componente donde se visualiza las ofertas de los productos por parte de las tiendas con su respectiva imagen y titulo.

[Subir](#top)

<a name="item41"></a>
### ProductCard.js

Componente donde se visualiza la informacion del producto con su respectivo rating ademas ademas si se encuentra disponible o no se encuentra en existencia.

![](https://i.imgur.com/TmhpAXj.png)
[Subir](#top)


<a name="item42"></a>
### ProductHorizontalCard.js

Card component donde se visualiza mis productos y tiendas favoritas

![](https://i.imgur.com/QvCtRoU.png)
[Subir](#top)

<a name="item43"></a>
### ProductImagesCarousel.js

Componente que mediante el efecto slider muestra las diferentes imagenes de un producto.

![](https://i.imgur.com/rJzz6EC.png)
[Subir](#top)

<a name="item44"></a>
### ProductModal.js

Componente que se encarga que luego de haber elegido la compra del producto abre una ventana modal para añadir al carrito de compras el respectivo producto.

![]([https://i.imgur.com/rJzz6EC.png](https://i.imgur.com/VAOLCVu.png))
[Subir](#top)

<a name="item45"></a>
### ProductProfile.js

Componete que describe a detalles las caracteristicas del producto, como su nombre lo indica hace referencia a detalles especificos del mismo.

![](https://i.imgur.com/KFBRShp.png)
[Subir](#top)

<a name="item46"></a>
### ProductsAdsSlider.js

Componente con efecto slider para mostrar las card de ofertas y productos

![](https://i.imgur.com/axG1Jdh.png)
[Subir](#top)

<a name="item47"></a>
### ProductsCollection.js

Componete padre que se encarga de distribuir los demas componentes hijos para su distribucion en la vista ademas donde se redireciona a una vista mas detallada del producto.

![](https://i.imgur.com/XYb9dto.png)
[Subir](#top)

<a name="item48"></a>
### ProductsFilters.js

Componente encargado de filtrar los resultados ya se a por por ratin caregoria y etiqueta

![](https://i.imgur.com/NRPjoUX.png)
[Subir](#top)

<a name="item49"></a>
### ProductsGrid.js

Componente donde se visualizan los elementos por grilla

![](https://i.imgur.com/bNABrAp.png)
[Subir](#top)

<a name="item50"></a>
### QuestionsAnswer.js

Componente usado para que los clientes hagan preguntas a los tiendas sobre cualquier duda que tengan.

![](https://i.imgur.com/DcsMxJe.png)
[Subir](#top)

<a name="item51"></a>
### SearchAddressFilter.js

Componente que filtra las ubicaciones de los envios por ubicacion.

![]()
[Subir](#top)

<a name="item52"></a>
### SearchInputMobile.js

Componente que al colocarse en modo de dispositivos moviles abre una ventana para ejecutar las funciones de buscardor.

![]()
[Subir](#top)

<a name="item53"></a>
### SectionHeading.js

Componente que se encarga de Cabecera por cada seccion del sitio.

![]()
[Subir](#top)

<a name="item54"></a>
### Select.js

Componente donde se selecciona el numero de telefono y el codigo del pais al que pertenece el cliente.

![]()
[Subir](#top)


<a name="item55"></a>
### SelectDeliverySection.js

Componente usado para visualizacion del detalle del delivery cuando el cliente realiza la compra.

![]()
[Subir](#top)


<a name="item56"></a>
### SelectGridMode.js

Componente encargado para los modos de visualizacion ya sea estilo grilla o por modo lista y su respectiva ubicacion en el mapa.

![]()
[Subir](#top)
<a name="item57"></a>
### ShareIcon.js

Componente no utilizado.

![]()
[Subir](#top)


<a name="item58"></a>
### ShowsFeaturedProducts.js

Componente que se encarga de mostrar los productos destacados de la categoria espectaculos.

![]()
[Subir](#top)


<a name="item59"></a>
### StarIcon.js

Componete usado como componete padre para el icono star para luego usarlo para el rating.

![](https://i.imgur.com/64aH7g6.png)
[Subir](#top)


<a name="item60"></a>
### StoreCard.js

Componente donde se visualiza una informacion de una tienda especifica alli se describen ciertas caracteristicas como el ranking, descuento, nombre, ademas si se encuentra abierta o cerrada.

![]()
[Subir](#top)


<a name="item61"></a>
### StoreCategoryFilter.js

Componete padre que muestra los componetes filtros hijo en en el siderbar.

![]()
[Subir](#top)


<a name="item62"></a>
### StoreHorizontalCard.js

Componente donde se visualiza la informacion del producto cuando el usuario elige la vista en modo lista alli se aprecian varios items como items, productos, descuentos, ubicacion.

![](https://i.imgur.com/cGnp1gh.png)
[Subir](#top)


<a name="item63"></a>
### StoresCollection.js

Componente donde muestra las tiendas almacenadas en el sitio, directamente desde la base de datos.

![](https://i.imgur.com/3TuddIO.png)
[Subir](#top)

<a name="item64"></a>
### StoresFilters.js

Componete que filtra los elementos por las categorias del sitio.

![]()
[Subir](#top)
<a name="item65"></a>
### SuperMarketsFeaturedProducts.js

Componete que muestra los productos destacados de la categoria supermercados.

![]()
[Subir](#top)

<a name="item66"></a>
### TableBody.js

Componente padre donde se colocan los elementos, es el cuerpo de los elementos.

![](https://i.imgur.com/v6ZnQbE.png)
[Subir](#top)

<a name="item67"></a>
### TableCell.js

Componete que define las celdas que estan el grid del elemento.

![](https://i.imgur.com/ZzSsmee.png)
[Subir](#top)

<a name="item68"></a>
### TableHead.js

Componente padre que se usa definir un layout para separar el espacio de todos los elementos items.

![]()
[Subir](#top)

<a name="item69"></a>
### TableRow.js

Componente que se usa definir un layout para separar items.

![](https://i.imgur.com/mibkJ9U.png)
[Subir](#top)

<a name="item70"></a>
### TextField.js

Componente usado para colocar el Campo de Texto.

![]()
[Subir](#top)

<a name="item71"></a>
### Componente usado para la informacion de las direcciones del cliente

Description

![]()
[Subir](#top)

<a name="item72"></a>
### VideoComponent.js

Componete que muestra el video del producto elegido.

![](https://i.imgur.com/EZ1W10b.png)
[Subir](#top)


<a name="item73"></a>
### WidgetComponent.js

Componente usado para facilitar y darle un sentido mas dinamicos a los elementos del sitio en el dinamismo del texto.

![](https://i.imgur.com/6mgQWwt.png)
[Subir](#top)

<a name="item74"></a>
### logOutModal.js

componente que abre una ventana emergente para cerrar sesion

![]()
[Subir](#top)


<a name="item75"></a>
### StoreNewPost.js

Componente que se encarga de visualizar los nuevos posteos de las tiendas de sus respectivos productos o eventos.

![]()
[Subir](#top)

<a name="item76"></a>
### Checkbox.js

Elemento para tildar para selecionar un elento y asi filtrar una busqueda.

![](https://i.imgur.com/vO27pDw.png)
[Subir](#top)

<a name="item77"></a>
### TabContainer.js

Componente layout usado para dividir elementos por pestañas, y es el encargado de la estructura de la tab.

![](https://imgur.com/a/kSdLskT)
[Subir](#top)
