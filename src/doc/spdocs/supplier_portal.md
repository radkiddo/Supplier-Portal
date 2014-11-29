Supplier (Document) Portal DevNet
=======
Overview
---------------

The **Supplier Portal SDK** SDK (or **SpSDK**) is a subset of Software Development Kits, in particular .NET Core & Lite set of HTTP(S) libraries that empower any eFLOW application to expose batch information through a private and secure [SPA](http://en.wikipedia.org/wiki/Single-page_application) front end built with [Node](http://nodejs.org/) / [Express](http://expressjs.com/) [RESTful](http://en.wikipedia.org/wiki/Representational_state_transfer) API, and a flexible [MongoDB](http://www.mongodb.org/) document key-value store, allowing easy eFLOW batch information discovery and interaction, through a metro style modern and responsive web interface.

The **SpSDK** is made up of a *Core* ([Chilkat](http://www.chilkatsoft.com/) based) library which is NOT intended to be used by eFLOW Developers (which is responsible for low level HTTP(S) & FTP communication between the Supplier Portal and eFLOW) and a *Lite* library which is intended to be used by eFLOW Developers and wraps up all the complexity of *Core* library. 

The **SpSDK** also contains a **SupplierPortalService** which runs silently and non-intrusively as a Windows service and handles any realtime communication between eFLOW and the Supplier Portal backend.

The **SupplierPortalService** does 99.9999% of the work / interaction between eFLOW and the Supplier Portal and handles entirely all realtime updates about batch statuses, batch info and data-exchange in both directions.

The **SupplierPortalService** does not require any developer programming, and it just needs to be configured to point to one of more eFLOW apps.

The **SupplierPortalService** and parts of the **SpSDK** also rely on the [Collection Management SDK](http://doksend.com/eFlowSdk/) for fast and easy eFLOW batch information retrieval.

*Sounds complicated?* Well, it actually isn't. 

Although there are a lot of different technologies involved, it's been created to be very easy to implement, configure and get up and running, with very little requirements.

**A version for eFLOW 5 is also now available**.

Getting Started
---------------
In order to get started, there are certain things you'll need to have, such as a Windows box where eFLOW will run and two web server boxes (not on the same machine as the eFLOW box). 

Basically for the web server part, you'll need:

### Main Server 

The Main Server (or **MServer**) requires the following software - 

*(doesn't really matter if the box runs Windows or Linux. We recommend though a Linux server)* ->

	- Nginx
	- Node.js
	- Mongo DB instance
	- Express

You may setup your own server or alternatively we recommend you setup & run this environment easily on [AppFog PaaS](https://www.appfog.com/).

### File Server

The File Server (or **FServer**) requires the following software - 

*(doesn't really matter if the box runs Windows or Linux)* ->

	- IIS or Apache with PHP 5.X.X or higher.
	- FTP access.

You may setup your own server or alternatively we recommended you setup & run this environment easily on [DreamHost](http://www.dreamhost.com/).

### eFLOW Server

The eFLOW server needs to be a **Windows** machine. For specific eFLOW requirements, please refer to the [eFLOW Documentation](http://documentation.mycompany.com/).

The Supplier Portal SDK runtime (**SupplierPortalService** and it's dependencies) will run on the eFLOW Server.


Download
---------------
The Supplier Portal SDK & Supplier Portal (web server parts) are *(unfortunately)* not directly available for download, however you can contact the project owner on **`tis [at] doksend (dot) com`** for further details. 

**Please note** that the download details will only be provided to TIS personnel and certified partners implementing projects that require the Supplier Portal. 

Web Server Parts
===========
MServer
---------------
The **MServer** is the main web server part of the Supplier Portal. It handles all server side aspects of the platform *(including database persistance)*, except File uploads which are handled by the **FServer**. 

The **MServer** also sends email notifications related to the Supplier Portal.

We won't cover here how to get a box with [Nginx](http://nginx.com/), [Node.js](http://nodejs.org/), [Express](http://expressjs.com/) or [MongoDB](http://www.mongodb.org/) up and running or how to setup a server on [AppFog](https://www.appfog.com/), as this is not the subject of this documentation.

If any sort of assistance would be needed on this particular subject, we can kindly offer **Professional Services**. For that, please contact the project owner on **`tis [at] doksend (dot) com`** for further details. 

### MServer Configuration

Once you have a box with the necessary requirements up and running, in order to get the **MServer** web part working, you'll need to configure the following files ->

	- webpages.js (under source folder /routes)
	- model.js (under source folder /model)

The **MServer** also uses the following files *(which are actually pulled from the **FServer**)* ->

	- admins.json (under source folder /json)
	- approved.json (under source folder /json)
	- domains.json (under source folder /json)
	- validations.js (under source folder /phpServerScripts)
	
**Please note** that within the *source folder /txt/edit_urls.txt*, there's a list of items that need to be edited on both the **FServer** and **MServer**, which is exactly the same that is explained here using a more user friendly approach.

### webpages.js config

The following parameters with *exports.adminforusers*: 

- host
- path

need to be modified accordingly with the Host URL of the **FServer** and the sub URL path to the location of the **admins.json** and **approved.json** files.

Likewise, the 3rd and 4th parameters of *exports.gjson* within *exports.alist* need to be modified as well, like *host* and *path* 

**Here's the snippet of code** -> 

*Where*

`'www.doksend.com'` -> *indicates the host*

`'/supplierportal/admins.json'` -> *indicates the path*

``` js

exports.adminforusers = function(req, res) {
	var options = {
  		host: 'www.doksend.com',
  		path: '/supplierportal/admins.json'
	};
	
exports.alist = function(req, res) {
	exports.gjson(req, res, 'www.doksend.com', 
	'/supplierportal/approved.json');
};
```

### model.js config

The following parameters for email sending notifications need to be modified, according to your email server / provider settings:

- user  *(user account name for the email server)*
- password  *(password for the user account name)*
- host  *(email server smtp host name)*
- ssl  *(if the email smtp server uses ssl or not - boolean)*

**Here's the snippet of code** ->

``` js
var server  = emailserver.server.connect({
   user: "supplierportal@doksend.com", 
   password: "your-password-goes-here", 
   host: "smtp.gmail.com", 
   ssl: true
});
```

**Please note** that in this example, `doksend.com` *(which acts as the **FServer**, also serves as an **email SMTP server**)*, although in your case, the **FServer** does NOT necessarily have to be the **email SMTP server**.

**Furthermore**…

The following line needs to be commented out *(if localhost is not the location of the MongoDB instance)* or the parameter indicated by *localhost* needs to be changed to the correct location of your [MongoDB](http://www.mongodb.org/) instance:

`db = mongoose.createConnection('localhost', pDb);`
 
For example, on [AppFog](https://www.appfog.com/), the MongoDB instance location is obtained as ->

``` js
db = mongoose.createConnection(application.env['mongodb-1.8'][0]['credentials']['hostname'], pDb);
```
So, on AppFog, the string:

`db = mongoose.createConnection(application.env['mongodb-1.8'][0]['credentials']['hostname'], pDb);`

should remain exactly as such.

**But** the Mongo DB instance details might be different if you've setup Mongo DB on your own. 

That's why to keep things as easy as possible, you recommend you host your **MServer** on AppFog :)
  

FServer
---------------
The **FServer** is the File upload server part of the Supplier Portal. It handles only File uploads from the **MServer**, **SpSDK** client code and **SupplierPortalService**.

We don't cover here how to setup an [IIS](http://www.iis.net/) or [Apache](http://httpd.apache.org/) box with [PHP](http://php.net/) and [FTP access](http://en.wikipedia.org/wiki/File_Transfer_Protocol) up and running or how to setup a hosted account on [Dreamhost](http://www.dreamhost.com/) or any other hosting provider.

If any sort of assistance would be needed on this particular subject, we can kindly offer **Professional Services**. For that, please contact the project owner on **`tis [at] doksend (dot) com`** for further details.

### FServer Configuration

Once you have a box with the necessary requirements up and running, in order to get the **FServer** web part working, you'll need to configure these files ->

	- admins.json (under source folder /json)
	- approved.json (under source folder /json)
	- domains.json (under source folder /json)
	- validations.js (under source folder /phpServerScripts)
	- upload.php (under source folder /phpServerScripts)

**Please note** that within the *source folder /txt/edit_urls.txt*, there's a list of items that need to be edited on both the **FServer** and **MServer**, which is exactly the same that is explained here using a more user friendly approach.

### admins.json config

The `admins.json` contains the definitions of who is the admin for specific supplier domains. 

The format used is [JSON](http://www.json.org/).

For example, the following JSON definition indicates who is the Supplier Portal admin for *supplier1.com* and *supplier2.com* ->

``` js
{
	"supplier1.com":"admin@acme-corp.com",
	"supplier2.com":"admin@acme-corp.com"
}
```

**Please note** that if a *supplier's domain name* does NOT appear or is NOT added to the `admins.json` file, that supplier **won't have access** to the Supplier Portal.


### approved.json config

The `approved.json` contains the definitions of which supplier domains are allowed to [Sign Up](http://supplierportal.aws.af.cm/#/usersignup) as **Suppliers** to the Supplier Portal.

The format used is *(as you might have guessed)* also [JSON](http://www.json.org/) :)

For example, the following JSON definition indicates which *supplier domains* are allowed to Sign Up as *suppliers* to the Supplier Portal ->

``` js
{
	"supplier1.com":"ok",
	"supplier2.com":"ok"
}
```

**Please note** that if a *supplier's domain name* does NOT appear or is NOT added to the `approved.json` file, that supplier **won't be allowed** to Sign Up as a *supplier* the Supplier Portal.

### domains.js config

The `domains.json` contains the configuration variables used by the **MServer** which indicate the URL paths to *core* parts of the Supplier Portal, such as *Document Viewer*, *Online Validations* and *Core Web Api*.

**IF IN DOUBT**, please check first with the project owner on **`tis [at] doksend (dot) com`** on how to change this file according to your web server infrastructure.

Example of this file ->

``` js
{
	"registeredValidations":"http://www.doksend.com/supplierportal/php/",
	"registeredDomain":"http://www.doksend.com/supplierportal/",
	"registeredDomain2":"http://www.doksend.com/supplierportal/php/",
	"registeredViewerUrl":"http://docs.google.com/",
	"registeredImagesReceiveFolder":"images_receive",
	"registeredDataDomain":"http://supplierportal.aws.af.cm"
}
```

*Where*

`"registeredValidations"` -> *indicates the URL path (location) on the **FServer** where the validations core exists*

`"registeredDomain"` -> *indicates the URL base path (location) on the **FServer** where the core FServer functionality exists*

`"registeredDomain2"` -> *indicates the URL base alternative path (location) on the **FServer** where the core FServer functionality exists*

`"registeredViewerUrl"` -> *indicates the URL path which is used an an Image Viewer on the **FServer**. By **DEFAULT (and as designed)**, the Google Docs Viewer is used. **THIS SHOULD BE CHANGED***

`"registeredImagesReceiveFolder"` -> *indicates the folder  (location) on the **FServer** where the uploaded images / invoices are placed and later picked up by the **SupplierPortalService** and transferred to the **eFLOW Server**. It is recommended that the name **images_receive** is kept. It is also assumed that such a folder named **images_receive** exists on the **FServer**.*

`"registeredDataDomain"` -> *indicates the URL path (location) on the **MServer** where the core MServer functionality exists*


### validations.js config

The `validations.js` is the core engine that runs the client .js validations for fields (field events). 

The client .js validations are uploaded to the **FServer** by the **SupplierPortalService** running on the **eFLOW server**.

It relies on the [EasyXDM](http://easyxdm.net/wp/) library, which allows for cross domain messaging.

Cross domain messaging is required, because the **MServer** and **FServer** might not necessarily be hosted on the same domain.

The `validations.js` file is used by the `validations.php` file which is also part of the **FServer** set of files.

By default, the `validations.php` calls the *minified* version of `validations.min.js` as follows:

`<script src="validations.min.js"></script>`

*However*…

The non-minified version can be used as:

`<script src="validations.js"></script>`

If the `validations.js` file is changed *(and you wish to use the minified version)*, it should be minified to `validations.min.js`.

Minification can be done using [UglifyJS](http://lisperator.net/uglifyjs/).

The following line within `validations.js` needs to be updated accordingly with the URL path on the **FServer** to where the `validations` reside.

`var dmn = 'http://www.doksend.com/supplierportal/validations/'`

Here's the snippet that contains this code within `validations.js` ->

``` js
var dmn = 'http://www.doksend.com/supplierportal/validations/',
	vars = message.split('|'),
    fieldId = vars[0],
    fieldValue = vars[1],
    app = vars[2],
    domain = vars[3];    
```

### upload.php config

The `upload.php` is used by the **FServer** in order to have files transferred from the client *(browser)* to the Supplier Portal. 

Files uploaded are then picked up from the **FServer** to the **eFLOW Server** by the **SupplierPortalService**.

This file contains the following settings that should be modified according to your server setup ->

``` php
$storeFolder = 'images_receive'; // should NOT be changed

$finalPath = '/images_receive/'; // should NOT be changed
	
$ftp_server = "ftp.myhost.com";

$ftp_user_name = "supplierportaluser";

$ftp_user_pass = "your_ftp_password";
```

**Please note** that a folder called `images_receive` MUST exist on the **FServer**.


### Writing Field Validations

The **FServer** allows you to write your own custom *online field validations* in Javascript / [jQuery](http://jquery.com/), which are executed on the web on the Supplier Portal site *(they are executed on the **FServer**)*.

Writing the *online field validations* requires only a basic know how of working with Javascript and each field can have it's own validation code.

Even though these *online field validations* are executed on the web, they can be written on the **eFLOW Server** and they can be automatically synced to the **FServer** by the **SupplierPortalService**.

Each **eFLOW App** configured through the **SupplierPortalService** settings, has it's own validation Javascript file.

For example, if an **eFLOW App** *(on the eFLOW Server)* configured through the **SupplierPortalService** is called `"AdvancedDemo"`, you can create a file called `AdvancedDemo.js` which will contain the Javascript code for online field validations. This `AdvancedDemo.js` is synced to the **FServer** by the **SupplierPortalService**.

The following code describes a very basic online field validation ->

``` js
(function ($) {

	runFieldValidation = 
	function (app, domain, fieldId, fieldValue) {
		return 'Field value is invalid';
	};

})(window.jQuery);
```

This code literally returns each field as invalid during online validation *(when Enter is pressed on each field, online)*. 

When a field is returned as *invalid*, a message box is displayed on the online Supplier Portal site to the user.

For instance the following code returns each field as valid *(no message is displayed on the online Supplier Portal site to the user)* ->

``` js
(function ($) {

	runFieldValidation = 
	function (app, domain, fieldId, fieldValue) {
		return '';
	};

})(window.jQuery);
```

This basically means that if you return an empty string '', the value is considered by the *validation* as *valid*, however if you return anything different than an empty string, the value is considered by the *validation* as *invalid*.

This will be considered by the *validation* as **valid**:

`return '';`

However, this will be considered by the *validation* as **invalid**:

`return 'Field value is invalid';`

If you would like to return different values (*valid* or *invalid*) for each or different field, the following example describes how to do it ->

``` js
(function ($) {

	runFieldValidation = 
	function (app, domain, fieldId, fieldValue) {
		if (fieldId.indexOf('amount') >= 0 ) {
		 if (fieldValue < 0) {
			return 'Field value is invalid';
		 }
		 else {
			return '';
		 }
		}
		
	};

})(window.jQuery);

```

In this example, all the fields that are partially called 'amount' *(contain the string 'amount' as part of the fieldId)*, which have a value *(fieldValue)* which is less than 0, will return *invalid*, otherwise return *valid*.

In short:

- return ''; *(indicates a valid validation result)*
- return 'anything else'; *(indicates an invalid validation result)*
- app *(indicates the eFLOW App name for this validation)*
- domain *(indicates the domain of the logged on user which is executing this validation)*
- fieldId *(indicates the fieldId, the Field Name of the field for which this validation is being executed)*
- fieldValue *(indicates the value of the field for which this validation is being executed)*

This following example shows that for a field called 'amount_tax', if the value is below 12 and above 21, then an invalid value is returned and for the rest of the fields, it just checks that the field length *(number of chars within a string)* is more than 5 chars, returning a valid result in that case.

``` js
(function ($) {

	runFieldValidation = 
	function (app, domain, fieldId, fieldValue) {
		if (fieldId === 'amount_tax') {
			if (fieldValue >= 12 && fieldValue <= 21) {
				return ''; // valid
		 	}
		 	else {
		 		return 'invalid';
		 	}
		}
		else { // other fields
			if (fieldValue.length > 5) {
				return ''; // valid
			}
			else {
				return 'invalid';
			}
		}
	};

})(window.jQuery);
```

Basically, you can write any kind of Javascript / jQuery code within a validation function code.


eFLOW Server Parts
===========

The *eFLOW Server Parts* refer to the **SupplierPortalService** and **SpSDK** custom code that runs on the eFLOW Server that connects to the **MServer** and **FServer** *(Supplier Portal Web Parts)*.

Introduction
---------------
You can think of the **SupplierPortalService** as the equivalent of the [Dropbox](https://www.dropbox.com/) client software that is probably installed on your machine, except that the **SupplierPortalService** syncs only eFLOW collection & metadata from the *eFLOW Server* to the Supplier Portal *Web Parts* *(to both the **MServer** and **FServer**)*.

The **SupplierPortalService** also syncs back to the *eFLOW Server* any updated data from the Supplier Portal *Web Parts* *(from both the **MServer** and **FServer**)*.

Now this is pretty cool, because it means that once you have setup the Supplier Portal *Web Parts*: **MServer** and **FServer**, there's nothing else that needs to be done on the web parts as the **SupplierPortalService** takes cares of the rest, including syncing any changes on the validation functions.

### Service Setup

The **SupplierPortalService** is actually Windows service that lives on the `eFLOW\Bin` folder can be installed as follows ->

``` js

C:\>sc create SupplierPortalService binpath= "C:\Program Files\Tis\eFlow 4.5\Bin\SupplierPortalService.exe"

```

**Please note** that the *space* between `binpath=` and `"C:\Program Files\Tis\eFlow 4.5\Bin\SupplierPortalService.exe"` is **NOT** a mistake and it **MUST** actually be present, in order for the `sc` command line app to properly create the **SupplierPortalService**.


The **SupplierPortalService** can be uninstalled as ->

``` js

C:\>sc delete SupplierPortalService
```

**Please note** that in order to have the  **SupplierPortalService** installed as a service, it should first have been built from source.

The other *Supplier Portal* part that sits on the *eFLOW Server* is the **SpSDK**, which allows interaction, communication and data exchange with the Supplier Portal *Web Parts* through eFLOW custom code.

The **SpSDK** will be covered following the **SupplierPortalService** settings. 



Requirements (4.5)
---------------

In order to use the **SpSDK**, you must have at least **eFLOW 4.5.1.595** *(or a higher build, up to SP4)* installed. 

Due to the different eFLOW 4.5.X.X runtime dependencies, the **SpSDK** should be compiled from source and should reference the eFLOW DLLs of the respective version being used.

**For higher eFLOW builds**, such as versions that include the Management DB, it is either necessary to build the Supplier Portal SDK from source code or you'll need to send to the project owner (**`tis [at] doksend (dot) com`**) your eFLOW Bin folder, so that the **SpSDK** can be compiled with the proper eFLOW runtimes. 

The reason is that the **SpSDK** relies on the *TiS.Core.eFlowAPI.dll*, *TiS.Core.eFlowInterfaces.dll* and *TiS.Core.PlatformRuntime.dll* core eFLOW runtimes and these have a different signature on builds that include the Management DB.

The machine where the **SpSDK** runtimes will be copied / deployed to, obviously needs to have eFLOW installed and it must also have access *(through a SQL Server connection string)* to the SQL Database Server instance where the **_Workflow** databases of the eFLOW apps (that will interact with the Supplier Portal) reside.

**The other requirement** for the **SpSDK** is .NET Framework 2.0 or higher on a Windows Operating system that supports at least .NET 2.0.


Requirements (5)
---------------
eFLOW 5 must be installed and up and running.

The **SpSDK** runtimes have to be compiled to the proper eFLOW 5 runtimes. It is either necessary to build the Supplier Portal SDK from source code or you'll need to send to the project owner (**`tis [at] doksend (dot) com`**) your eFLOW Bin folder, so that the **SpSDK** can be compiled with the proper eFLOW runtimes. 

The machine where the **SpSDK** runtimes will be copied / deployed to, obviously needs to have eFLOW installed and it must also have access *(through a SQL Server connection string)* to the SQL Database Server instance where the **_Workflow** databases of the eFLOW apps (that will interact with the Supplier Portal) reside.

.NET Framework 4.0 or higher on a Windows Operating system that supports at least .NET 4.0.


Steps
---------------

To get started with the **SpSDK** is actually quite simple and all that is needed is to:

1 => Make sure you comply with the requirements.

2 => Download the files and place the binaries on the eFLOW\Bin folder *(or compile from source)*.

3 => Configure the SupplierPortalService settings *(to be explained in the next topic)*.

4 => *(Optional)* Add customization to a Simple Auto station (to receive batches edited through the Portal). This is included as part of the the Visual Studio project example.

That's all.


Settings
---------------

The **SupplierPortalService** requires configuration in order to do it's job of syncing data back and forth between the *eFLOW Server* and the Supplier Portal *Web Parts*.

This configuration is normally only done once, when the system is setup.

Both the **SupplierPortalService** and the **SpSDK** use the same configuration file, which is called: `SupplierPortalCommon.dll.config` and is located on the *eFLOW\Bin* folder of the *eFLOW Server*.

Basically the `SupplierPortalCommon.dll.config` is simply a text file *(editable in Notepad)* which contents is XML. It contains all the settings that define the way that the **SupplierPortalService** and the **SpSDK** interact with the Supplier Portal *Web Parts*.

**Please note** that the `SupplierPortalCommon.dll.config` allows for the configuration of up to 10 eFLOW apps, which is why you will see that there are settings that have 10 instances defined.

These settings are exposed as follows:

### connectionStrXX

There are 10 instances of this setting, as follows ->

``` xml
<connectionStr01></connectionStr01>
<connectionStr02></connectionStr02>
<connectionStr03></connectionStr03>
<connectionStr04></connectionStr04>
<connectionStr05></connectionStr05>
<connectionStr06></connectionStr06>
<connectionStr07></connectionStr07>
<connectionStr08></connectionStr08>
<connectionStr09></connectionStr09>
<connectionStr10></connectionStr10>
```

This means that each `<connectionStrXX>` setting corresponds to a different eFLOW app. 

If a `<connectionStrXX>` is left empty, it means there is no eFLOW app configured for that particular setting.

The `<connectionStrXX>` setting, defined an eFLOW app's connection to the **_Workflow** database.

Example ->

``` xml
<connectionStr01>Data Source=TEST1\SQLEXPRESS;Initial Catalog=IRSupplierPortal_Workflow;Integrated Security=True</connectionStr01>
<connectionStr02>Data Source=TEST1\SQLEXPRESS;
Initial Catalog=CLS_Workflow;Integrated Security=True</connectionStr02>
<connectionStr03>Data Source=TEST1\SQLEXPRESS;
Initial Catalog=AdvancedDemo_Workflow;Integrated Security=True</connectionStr03>
<connectionStr04></connectionStr04>
<connectionStr05></connectionStr05>
<connectionStr06></connectionStr06>
<connectionStr07></connectionStr07>
<connectionStr08></connectionStr08>
<connectionStr09></connectionStr09>
<connectionStr10></connectionStr10>
```

By looking at these settimgs carefully, we can see that:

- connectionStr01 -> *points to IRSupplierPortal_Workflow*
- connectionStr02 -> *points to CLS_Workflow*
- connectionStr03 -> *points to AdvancedDemo_Workflow*

Which basically means that:

- connectionStr01 -> *connects to an eFLOW app called IRSupplierPortal*
- connectionStr02 -> *connects to an eFLOW app called CLS*
- connectionStr03 -> *connects to an eFLOW app called AdvancedDemo*

So, it's pretty straightforward. By default we recommend to use SQL Server Windows Authentication, which is what is being used on all these connection strings.

To recap, basically in this example there are 3 eFLOW apps configured, for which the **SupplierPortalService** and the **SpSDK** can connect to and sync data back and forth with the Supplier Portal *Web Parts*.

**Please note** that there are other settings that also have 10 instances, such as `<appXXWhoCanSeeInPortal>`, `<appXXImportPath>`, `<fieldsToCheckXX>`, `<stationsToCheckForFieldsXX>`, `<excludeStationsXX>`, `<supplierUser2supplierIdsXX>` and `<offlineFieldValidationFileXX>`.

These are ALL correlated to each other. This means that the ORDER is important.

Example:

`<connectionStr03>` correlates to:

``` xml
	- <app03WhoCanSeeInPortal>
	- <app03ImportPath>
	- <fieldsToCheck3>
	- <stationsToCheckForFields3>
	- <excludeStations3>
	- <supplierUser2supplierIds3>
	- <offlineFieldValidationFile3>
```

So, these would represent the settings of eFLOW app number 3 configured against the **SupplierPortalService** and the **SpSDK**.

As such, `<connectionStr01>` correlates to:

``` xml
	- <app01WhoCanSeeInPortal>
	- <app01ImportPath>
	- <fieldsToCheck1>
	- <stationsToCheckForFields1>
	- <excludeStations1>
	- <supplierUser2supplierIds1>
	- <offlineFieldValidationFile1>
```

So, these would represent the settings of eFLOW app number 1 configured against the **SupplierPortalService** and the **SpSDK**.


### interval

Represents the number of seconds that the internal Timer object within the **SupplierPortalService** will be executed in order to run a sync activity / task.

By default the value set on the `SupplierPortalCommon.dll.config` is 2 seconds.

Everytime the Timer gets executed, it doesn't mean a full data sync is going to happen, however it does mean that the **SupplierPortalService** will check if data has changed and if so trigger a sync activity / task.

Even though this value can be set to anything from 1 second upwards, the **SupplierPortalService** consumes almost no CPU, even during peaks.

### portalFilesRouteKey

Indicates the FTP URL on the **FServer**. Example:

`ftp.doksend.com`

### appXXWhoCanSeeInPortal

Indicates which domains are allowed through the **SupplierPortalService** and the **SpSDK** to interact with the eFlow App defined by `<connectionStrXX>`, where the number represented by `XX` on `<connectionStrXX>` and `<appXXWhoCanSeeInPortalXX>` need to be the same.

So, `<appXXWhoCanSeeInPortalXX>` must correlate to `<connectionStrXX>`, both need to have the same XX number.

More than one domain can be specified. A `|` *(pipe)* char can be used to separate and indicate more than one domain.

Example ->

``` xml
<app01WhoCanSeeInPortal>IRSupplierPortal_Workflow=mycompany.com|doksend.com</app01WhoCanSeeInPortal>
``` 

`IRSupplierPortal_Workflow=mycompany.com|doksend.com`

This means that the eFLOW app called `IRSupplierPortal` *(IRSupplierPortal_Workflow)* can only be synced *(through the **SupplierPortalService** and the **SpSDK**)* by requests originating from the users logged on to the Supplier Portal *Web Parts*, using accounts with the domains: *mycompany.com* and *doksend.com*.

If that sounds too complicated, as the name of the property itself implies `app who can see in portal`, basically it just means if the eFLOW app and it's corresponding data are available on the Supplier Portal *Web Parts*, and to which users (admins and suppliers) domains.

Basically as a rule of thumb, an admin domain *mycompany.com* should always be specified before a supplier domain, such as *doksend.com*.

An admin domain is the domain of the company for which the Supplier Portal has been setup for.

A Supplier domain is the domain of a supplier to which the Supplier Portal has been setup for. 


### appXXImportPath

Each eFLOW app configured through the `SupplierPortalCommon.dll.config` to be synced by the **SupplierPortalService** and the **SpSDK**, needs to have an `Import Path` *(import folder)*, where the **SupplierPortalService** and the **SpSDK** will download image files and metadata that has originated from the Supplier Portal *Web Parts*. These images and metadata are taken from this import path and used to create collections.

So it basically indicates which are the import paths that are allowed through the **SupplierPortalService** and the **SpSDK** to interact with the eFlow App defined by `<connectionStrXX>`, where the number represented by `XX` on `<connectionStrXX>` and `<appXXImportPath>` need to be the same.

So, `<appXXImportPath>` must correlate to `<connectionStrXX>`, both need to have the same XX number.

Example ->

``` xml
<app01ImportPath>c:\temp\IRSupplierPortal</app01ImportPath>
```

This means that the eFLOW app called `IRSupplierPortal`, has an import path for data that originates from the Supplier Portal *Web Parts*, on folder `c:\temp\IRSupplierPortal`.

### fieldsToCheck1..10

Because an eFLOW app can sometimes have possibly hundreds of fields, you might not need to have all those fields synced by the **SupplierPortalService** or the **SpSDK** to the Supplier Portal *Web Parts*, which would create an unnecessary overhard of HTTP traffic, so therefore you can limit which fields should be synced to the Supplier Portal *Web Parts*. This is the purpose of the `<fieldsToCheck1..10>` setting.

This setting correlates to the appropiate `<connectionStrXX>` setting.

An eFlow App defined by `<connectionStrXX>`, where the number represented by `XX` on `<connectionStrXX>` and `<fieldsToCheckXX>` need to be the same.

Example ->

``` xml
<fieldsToCheck1>Invoice_Number|PO_Number|Total_Amount|Supplier_Name|Net_Amount1|VAT_Amount1|VAT1|Invoice_Date</fieldsToCheck1>
```
Fields are separated by a `|` *(pipe)* char.

In this particular example, the eFLOW app 1 *(which according to connectionStr01 is **IRSupplierPortal**)*, will have the following fields synced to the Supplier Portal *Web Parts*:

	- Invoice_Number
	- PO_Number
	- Total_Amount
	- Supplier_Name
	- Net_Amount1
	- VAT_Amount1
	- VAT1
	- Invoice_Date

This represents a subset of all the existing fields available on the **IRSupplierPortal** eFLOW app.

**Please note** that if no fields are defined for an eFLOW app, no fields will be synced to the Supplier Portal, so you must explicitly define which fields are going to be synced.

### stationsToCheckForFields1..10

Just like an eFLOW app might have lots of different fields and not all might be needed on the Supplier Portal *Web Parts*, there can also be eFLOW stations that do NOT need to sync data back to the Supplier Portal.

This is precisely what this setting is all about. It allows you to define which eFLOW stations will sync the fields defined on `<fieldsToCheckXX>`.

XX on `<fieldsToCheckXX>` needs to correlate *(be the same number)*  to XX on `<stationsToCheckForFieldsXX>`.

**Please note** that if no stations are definef for an eFLOW app, no station data (and subsequently field data) will be synced to the Supplier Portal, so you must explicitly define which fields are going to be synced.

Stations are separated by a `|` *(pipe)* char.

Example *(Invoice Reader app)* ->

``` xml
<stationsToCheckForFields1>[SPortalImport=(FilePortal)|(ScanPortal)|(PageOCR)|(FreeMatch)|(FreeProcess)|(Completion)]|SPortalCompl|
[SPortalAfter=(PreExport)|(ERPExport)|(Clean)]</stationsToCheckForFields1>
```

This example is the typical and *default* way of defining which stations should be synced to the Supplier Portal for an eFLOW **Invoice Reader** app. These settings should *NOT be changed* and should be used for all **Invoice Reader** apps.

Let's descontruct the setting to explain what it means:

It basically has three parts:

1. *[SPortalImport=(FilePortal)|
(ScanPortal)|(PageOCR)|
(FreeMatch)|(FreeProcess)|
(Completion)]*

2. *SPortalCompl*

3. *[SPortalAfter=(PreExport)|
(ERPExport)|(Clean)*

The **SpSDK** defines for any **Invoice Reader** app 3 parts:

- Anything before the Supplier Portal Online Validation / Completion *(also known as: SPortalImport)* -> This is seen within the Supplier Portal *Web Parts* as a collection / invoice in *Processing*.

- Anything on the Supplier Portal Online Validation / Completion *(also known as: SPortalCompl)* -> This is seen within the Supplier Portal *Web Parts* as a collection / invoice to *Edit* or *Re-Edit*.

- Anything on the Supplier Portal Online Validation / Completion *(also known as: SPortalAfter)* -> This is seen within the the Supplier Portal *Web Parts* as a collection / invoice that has been *Processed*.

Therefore:

*[SPortalImport=(FilePortal)|
(ScanPortal)|(PageOCR)|
(FreeMatch)|(FreeProcess)|
(Completion)]*

means that:

- FilePortal
- ScanPortal
- PageOCR
- FreeMatch
- FreeProcess
- Completion *(eFLOW default Completion)*

will be treated as stations *before the Supplier Portal Online Validation*, so *Processing* stations.

Note that the syntax is:

*[SupplierPortalPhase]=(eFLOW_station1|eFLOW_stationX)]*

Where *SupplierPortalPhase* is either: `SPortalImport` or `SPortalAfter` and *eFLOW_station1* and *eFLOW_stationX* are the actual names of the eFLOw stations.


*SPortalCompl* -> will be treated as the *Supplier Portal Online Validation*.


*[SPortalAfter=(PreExport)|
(ERPExport)|(Clean)*

means that:

- PreExport
- ERPExport
- Clean

will be treated as stations *after the Supplier Portal Online Validation*, so *Processed* stations.


**Please note** that even though the Supplier Portal is designed to process invoices through the eFLOW **Invoice Reader** *(on eFLOW 5, it also works with eFLOW Mailroom)*, the Supplier Portal is also actually capable of working with any kind eFLOW app, so not just necessarily invoices.

When the Supplier Portal works with non **Invoice Reader** related eFLOW apps, then it basically acts as a *Web Controller* and *Web Validation* tool *(as file upload functionality is really not suitable or made explicitly available for non **Invoice Reader** eFLOW apps).

As an example on how this would look on a *non Invoice Reader* app, you just basically have to define the stations and just use a `|` *(pipe)* char to separate them.

Example *(non Invoice Reader app)* ->

``` xml
<stationsToCheckForFields2>FormId|Recognition|ManualID|OfficeForms|Export|
Completion|FreeProcess</stationsToCheckForFields2>
```
So, basically on *non Invoice Reader* apps, just use the station names.

In this example, data from the following stations will be synced to the Supplier Portal *Web Parts*:

- FormId
- Recognition
- ManualID
- OfficeForms
- Export
- Completion
- FreeProcess


### imgUserName

Indicates the FTP user account name that is allowed to connect to the **FServer** identified by `<portalFilesRouteKey>`.

This user must exist as an FTP user with read / write access on the FTP server / path identified by `<portalFilesRouteKey>` on the **FServer**.

The FTP user is used by the **SupplierPortalService** and **SpSDK** in order to send / receive / sync data *(images / metadata)* with the Supplier Portal *Web Parts*.

### imgPwd

Indicates the FTP user account password that is allowed to connect to the **FServer** identified by `<portalFilesRouteKey>`.

This user must exist as an FTP user with read / write access on the FTP server / path identified by `<portalFilesRouteKey>` on the **FServer**.

The FTP user is used by the **SupplierPortalService** and **SpSDK** in order to send / receive / sync data *(images / metadata)* with the Supplier Portal *Web Parts*.

### imgFolder

Indicates the FTP folder on the the **FServer** identified by `<portalFilesRouteKey>`, which is used by the **SupplierPortalService** and **SpSDK** in order to send / sync data to the Supplier Portal *Web Parts*.

The *default* folder name is `/images` *(please note that it MUST be prefixed with a /)* and this folder MUST exist on the FTP on the **FServer**.

### imgReceive

Indicates the FTP folder on the the **FServer** identified by `<portalFilesRouteKey>`, which is used by the **SupplierPortalService** and **SpSDK** in order to receive / sync data to the Supplier Portal *Web Parts*.

The *default* folder name is `/images_receive` *(please note that it MUST be prefixed with a /)* and this folder MUST exist on the FTP on the **FServer**.

**Please note** that this folder name is also used on several of the settings previously explained on both the **FServer** and **MServer**.

### useS3

S3 refers to [Amazon Simple Storage Service (Amazon S3)](http://aws.amazon.com/s3/), part of Amazon Web Services, which is a high availability cloud storage key / value store for objects *(such as files and metadata)*.

By *default* the **SupplierPortalService** and **SpSDK** have built-in support `out of the box` for Amazon S3, which means that both can read / write to Amazon S3 Buckets.

However, due to [Cross Domain](http://en.wikipedia.org/wiki/Cross-domain_solution) issues with AppFog and it's inability to deal with [temporary file storage](https://docs.appfog.com/faq#persistentfs), before writing files to any S3 Bucket, S3 support has been deprecated / removed from the Supplier Portal *Web Parts* (on the **MServer**) and only *FTP* support has been left, due to it's solid reliability.  

Therefore, although the **SupplierPortalService** and **SpSDK** have `out of the box` support for Amazon S3, the Supplier Portal *Web Parts* does **NOT**, and because of this, by *default*, this setting is set to *false* on the `SupplierPortalCommon.dll.config` file, and **should NOT be changed**.

Eventually, we will look into supporting Amazon S3 on the Supplier Portal *Web Parts*, when AppFog supports temp storage or alternatively if required through a specific project / customer request *(not hosted on AppFog)*, but only via *Advanced* Professional Services.

It is sufficient to say that *FTP* works just great with the **SupplierPortalService**, **SpSDK** and Supplier Portal *Web Parts* and serves perfectly as a repository for syncing.

### s3AccessKey

The Amazon S3 access key. 

Not being used on the Supplier Portal *Web Parts*, as explained on the `useS3` topic.

### s3SecretKey

The Amazon S3 secret key. 

Not being used on the Supplier Portal *Web Parts*, as explained on the `useS3` topic.

### s3Bucket

The Amazon S3 bucket. 

Not being used on the Supplier Portal *Web Parts*, as explained on the `useS3` topic.

### flexibleDb

The **MServer** relies on a [MongoDB](http://www.mongodb.org/) instance for document storage. This acts as the non-relational `database`used by the Supplier Portal *Web Parts*.

The **MServer** wraps the MongoDB functionality and interaction around a web api based on [Express](http://expressjs.com/), called [Flexible Cloud DB](http://doksend.com/eFlowSdks/fcloud.html), which is responsible for handling all data metadata communication to the backend.

This `flexibleDB` is the parameter that indicates the URL entry point on the **MServer** where the Flexible Cloud DB is hosted.

By default, the `Flexible Cloud DB` and **MServer** have the same URL path, as the underlying Express app serves both the *Single Page web App* frontend of the Supplier Portal and also the `Flexible Cloud DB` api.

So, in short the `flexibleDB` should always point to the URL of the **MServer** *(or Supplier Portal)*.

### flexibleDbHttps

Indicates if set to *true* if the connection from the **SupplierPortalService** and **SpSDK** to the `flexibleDB` should be done through HTTPS *(if the domain begins with HTTPS)* or if set to *false*, done through standard HTTP.

By default, it is set to *false* and the connection is done through HTTP. The **SupplierPortalService** and **SpSDK** encrypt the metadata locally before sending it over HTTP.

This setting should only be set to *true*, if the entry point to the **MServer** / `flexibleDB` is hosted on a domain with an SSL certificate *(domain beginning with HTTPS)*.

### flexibleDbPort

Indicates the HTTP port where the connection to the `flexibleDB` needs to go through. 

By default, most HTTP connections go through port 80.

Should not be changed unless the HTTP connection goes through a different port or SSL / HTTPS is using a different port *(in case that SSL is used)*.

### fileDomain

Indicates the entry point on the **FServer** where the **SupplierPortalService** and **SpSDK** will use to send / upload / sync images and metadata to the Supplier Portal *Web Parts*.

This should be **FULL** URL path to the folder indicated by `<imgFolder>`.

Example:

``` xml
<fileDomain>http://www.doksend.com/supplierportal/images</fileDomain>
``` 

### excludeStations1..10

This another of those settings that is per eFLOW app an have 10 instances.

The XX number should correlate to the XX number of other settings that also have 10 instances.

So, or instance `<excludeStations1>` should correlate to `<connectionStr01>`.

Just like there are eFLOW stations that should be synced to the Supplier Portal *Web Parts*, you will likely have stations that really should not be synced to the Supplier Portal. Such stations are normally stations like *REJECT*, *PENDING*, *ePortal*, "Learning" or as a rule of thumb, any station that is not linked to the flow *(stations without a routing rule)*.

Example ->

``` xml
<excludeStations1>REJECT|PENDING</excludeStations1>
```
As usual, stations are separated by a `|` *(pipe)* char.


### tempFileUploadFolder

Indicates the local folder on the eFLOW Server where the **SupplierPortalService** and **SpSDK** are going to place *(in queue)* images and metadata that they are going to upload / send / sync to the **FServer**.

Example:

*c:\temp\upload*

Obviously this folder must exist on the local eFLOW Server folder.

### supplierPortalStationName

Indicates the name of *default* station name of *Invoice Reader* eFLOW app, which is `SPortal`.

This value is deprecated and not used, and thus should not be changed. 

### refDb

Indicates the connection string to the RefDB database on the eFLOW Server / SQL Server.

This is used by the **SupplierPortalService** and **SpSDK** to retrieve and sync supplier information to the Supplier Portal *Web Parts*.

Example:

*Data Source=SERVER1\SQLSERVER;Initial Catalog=RefDbIR;Integrated Security=True*

**Please note** that Windows authentication is used by default and we recommend this over SQL Server authentication *(for the sake of simplicity)*, although you can use as well SQL Server authentication.

### refDb_AllowedApps

Indicates the name of the eFLOW apps that are allowed to connect to the RefDB on the SQL Server, through the **SupplierPortalService** or **SpSDK**, in order to retrieve supplier data and sync that to the Supplier Portal *Web Parts*.

These apps should be *Invoice Reader* apps and not *standard* eFLOW apps.

If more than one app is referenced, they can be separated by the `|` *(pipe)* char.

Example ->

``` xml
<refDb_AllowedApps>IRSupplierPortal|IRApp</refDb_AllowedApps>
```


### refDb_AllowedDomains

Indicates which user logged on domains on the Supplier Portal *Web Parts* are allowed to view / use / retrieve supplier data through the **SupplierPortalService** or **SpSDK**.

Normally the user domains, should be the admin domain *(domain of the company to which the Supplier Portal has been setup for)* and the supplier domains *(suppliers to the company for which the Supplier Portal has been setup for)*.

Domains are separated by a `|` *(pipe)* char.

Example:

*mycompany.com|doksend.com*

You should always place first the admin domain and then the supplier domains.

### refDb_SupplierTable

Indicates the name of the main `SupplierTable` data table on the RefDB database.

This is used by the **SupplierPortalService** and **SpSDK**.

Example:

*IRSuppliersFullData*

### refDb_SupplierId

Indicates the name of the `SupplierId` column / field on the RefDB database.

This is used by the **SupplierPortalService** and **SpSDK**.

Example:

*Supplier_ID*

### refDb_SupplierName

Indicates the name of the `SupplierName` column / field on the RefDB database.

This is used by the **SupplierPortalService** and **SpSDK**.

Example:

*Supplier_Name*

### refDb_SupplierStreet

Indicates the name of the `SupplierStreet` column / field on the RefDB database.

This is used by the **SupplierPortalService** and **SpSDK**.

Example: 

*Supplier_Street*

### refDb_SupplierZIP

Indicates the name of the `SupplierZip` column / field on the RefDB database.

This is used by the **SupplierPortalService** and **SpSDK**.

Example:

*Supplier_ZIP*

### refDb_SupplierCity

Indicates the name of the `SupplierCity` column / field on the RefDB database.

This is used by the **SupplierPortalService** and **SpSDK**.

Example: 

*Supplier_City*

### refDb_SupplierLand

Indicates the name of the `SupplierLand` *(country)* column / field on the RefDB database.

This is used by the **SupplierPortalService** and **SpSDK**.

Example:

*Supplier_Land*

### refDb_SupplierVATID

Indicates the name of the `SupplierVATID` column / field on the RefDB database.

This is used by the **SupplierPortalService** and **SpSDK**.

Example:

*Supplier_VATID*

### refDb_SupplierTelephone


Indicates the name of the `SupplierTelephone` column / field on the RefDB database.

This is used by the **SupplierPortalService** and **SpSDK**.

Example:

*Supplier_Telephone*

### refDb_SupplierFaxnumber


Indicates the name of the `SupplierFaxNumber` column / field on the RefDB database.

This is used by the **SupplierPortalService** and **SpSDK**.

Example: 

*Supplier_Faxnumber*

### refDb_SupplierEmail


Indicates the name of the `SupplierEmail` column / field on the RefDB database.

This is used by the **SupplierPortalService** and **SpSDK**.

Example:

*Supplier_email*

### refDb_SupplierBranchcode


Indicates the name of the `SupplierBranchcode` column / field on the RefDB database.

This is used by the **SupplierPortalService** and **SpSDK**.

Example:

*Supplier_Branchcode*

### refDb_SupplierAccountNo


Indicates the name of the `SupplierAccountNo` column / field on the RefDB database.

This is used by the **SupplierPortalService** and **SpSDK**.

Example:

*Supplier_AccountNo*
 
### refDb_SupplierIBAN


Indicates the name of the `SupplierIBAN` column / field on the RefDB database.

This is used by the **SupplierPortalService** and **SpSDK**.

Example:

*Supplier_IBAN*

### refDb_SupplierSWIFT


Indicates the name of the `SupplierSWIFT` column / field on the RefDB database.

This is used by the **SupplierPortalService** and **SpSDK**.

Example:

*Supplier_SWIFT*

### refDb_SupplierBUKRS


Indicates the name of the `SupplierBURKS` column / field on the RefDB database.

This is used by the **SupplierPortalService** and **SpSDK**.

Example:

*BUKRS*

### refDb_SupplierPOsTable

Indicates the name of the PO data table within the RefDB. 

This is used by the **SupplierPortalService** and **SpSDK**.

Example:

*EKKO*

### refDb_SupplierPOsSupplierId

Indicates the name of the SupplierID field on the `refDb_SupplierPOsTable` data table within the RefDB.

Example: 

*LIFNR*

*LIFNR* is the SupplierId field on the *EKKO* table.

### refDb_SupplierPOsPONumber

Indicates the name of the PO Number field on the refDb_SupplierPOsTable` data table within the RefDB.

Example:

*EBELN*

*EBELN* is the PO Number field on the *EKKO* table.

### supplierUser2supplierIds1..10

This is yet another one of those settings which have 10 instances. So, as previously explained, settings with 10 instances need to match / correlate to the other settings with also 10 instances.

so, in short `<supplierUser2supplierIds1>` will correlate to `<connectionStr01>`…

and `<supplierUser2supplierIds2>` will correlate to `<connectionStr02>`, etc, etc…

Basically the purpose of this setting is to be able to tell to the Supplier Portal **MServer** that a specific user will only have access to specific to select through the web interface of the Supplier Portal, specific supplier id's, when uploading or Flipping an Invoice.

If nothing is indicated *(if the value is left empty)*, by default, all the supplier id's existing on the RefDB configured for the **Invoice Reader** app defined on `<connectionStrXX>`, will be viewable and selectable by any *(admin or supplier)* user that has been granted access to the Supplier Portal.

Example:

``` xml
<supplierUser2supplierIds1>somebody@doksend.com=0000011246,0000011244
|someone@doksend.com=0000011245</supplierUser2supplierIds1>
``` 
In this example, the user `somebody@doksend.com` will only be able to view / select when uploading or flipping an invoice, supplier id's: *0000011246 and 0000011244* and the user `someone@doksend.com` will only be able to view / select the supplier id: *0000011245*.

**Please note** that with this syntax, multiple user can be separated by the `|` *(pipe)* char.

Another example:

``` xml
<supplierUser2supplierIds1>
</supplierUser2supplierIds1>
```
In this case, all users allowed to logon to the Supplier Portal will be able to view / select all the supplier id's available on the RefDb. *This is the default scenario*.

### offlineFieldValidationFile1..10

This is another of those settings that has 10 instances.

So, as previously explained, settings with 10 instances need to match / correlate to the other settings with also 10 instances.

so, in short `<offlineFieldValidationFile1>` will correlate to `<connectionStr01>`…

and `<offlineFieldValidationFile2>` will correlate to `<connectionStr02>`, etc, etc…

Basically the purpose of this setting is to define which Javascript *(.js)* file is used for an eFLOW app to execute online field validations.

Example:

``` xml
<offlineFieldValidationFile1>c:\temp\validations\irsupplierportal.js</offlineFieldValidationFile1>
```
Basically, this means that for the eFLOW app called `IRSupplierPortal`, the online field validations that will be executed will be the one written on the file `c:\temp\validations\irsupplierportal.js`.

The `c:\temp\validations\irsupplierportal.js` contains basically the online validation functions that can be written and can be executed for the `IRSupplierPortal` on the Supplier Portal *Web Parts*.

Each eFlow app configured to work with the Supplier Portal *Web Parts* can have it's own Javascript validation file.

These Javascript validation files are written on the eFLOW Server and they are synced to the **MServer** by the **SupplierPortalService**.

For more information on how to write online validations, please refer to the specific topic about this item, further above on this documentation.

### onlineFieldValidationFolder

Indicates the name of the folder on the **FServer** where the synced / uploaded validations files *(for online field validations)* sent by the **SupplierPortalService** or **SpSDK** are going to be fetched by the **MServer** using [EasyXDM](http://easyxdm.net/wp/), in order to execute field validations.


Customization
---------------

eFLOW **Invoice Reader** apps that will interact with the Supplier Portal, need some degree of minor customization, if they are to become more than simple web *read only* apps through the Supplier Portal.

Basically any eFLOW app can become a Supplier Portal app, however eFLOW apps that are just configured through the `SupplierPortalCommon.dll.config`, without any additional specific *Supplier Portal Customization* using the **SpSDK**, will simply be apps that will be *read only* to the Supplier Portal.

A *read only* app is an eFLOW app which it's collection and metadata are synced by the **SupplierPortalService** to the Supplier Portal *Web Parts*, in one direction, which is: *from eFLOW to the Supplier Portal*, however no metadata / images / invoices are transmitted / synced back from the Supplier Portal to eFLOW.

In order to have a bi-directional app on the Supplier Portal *(one that also syncs data from the Supplier Portal back to eFLOW)*, it is necessary to implement some customization on that eFLOW app, using the **SpSDK**, which is what this topics covers.

**Please note** that because the Supplier Portal is mostly built around the concept of suppliers submitting online their invoices to their customer *(the company for which the Supplier Portal has been setup)*, bi-directional apps *(to be customized)* are likely to be **Invoice Reader** apps and not other kind of eFLOW apps.

Customization of an **Invoice Reader** app requires, adding:

- Some metatags.
- Some stations.
- Some events to the new stations.
- Some events to existing stations *(overriding some events)*

Basically the process is actually not complicated, as the **SupplierPortalService** does most of the complicated and dirty job of handling syncs back and forth and also the **SpSDK** exposes a *Lite* library that encapsulates all the complicated and cryptic nature of the *core* HTTP library.

So for customization purposes, from the **SpSDK**, only the *Lite* library should be used and the *core* library should not be used, as it is quite complex.

The customization examples and steps will all be described using the **SpSDK** *Lite* library, even though the methods of the *core* methods are also part of this documentation.

By having a *Lite* library sit on top of the **SpSDK** *core* library, you get to appreciate the complexity of the problem being addressed by this project, which is to basically *transport* eFLOW data to a cloud web based app, seemlessly and practically through `thin air`.

The *core* library even encapsulates an even lower level library from [Chilkat Software](http://www.chilkatsoft.com/), which performs core HTTP requests.

In order to deal / create / gather collection details, the **SpSDK** *(Lite and Core)* libraries, use the [eFLOW Collection Management SDK](http://doksend.com/eFlowSdk/), which on it's own, encapsulates the complexities of the eFLOW Core CSM Api/SDK, allowing to deal with collections in an atomic, yet simple, fast and effective way.

The **SpSDK** is a .NET set of libraries and thus can be used from a .NET language. The examples here, will be presented in C#.

Sounds pretty cool, eh!? 

So. let's get rolling and see what needs to be customized for an app to become bi-directional.

### Logging

The **SupplierPortalService** and **SpSDK** do NOT use the standard eFLOW 4.5 logger, but instead and like eFLOW 5, they rely on the *Windows Event Viewer*.

Only errors and exceptions are logged into the *Windows Event Viewer* by the **SupplierPortalService** and **SpSDK**, and they appear under the *Applications/Supplier Portal* branch.

### Metatags

In order to have a bi-directional **Invoice Reader** app working with the Supplier Portal, the following `metatags` need to be added:

- SupplierName
- SupplierPortal
- SupplierPortalDateTime
- SupplierPortalDomain
- SupplierPortalPONumber
- SupplierPortalSupplierId

All these `metatags` will be used by the **SupplierPortalService** and **SpSDK** through the `SPortalImport` station *(which also needs to be added to the eFLOW app)*.

All these `metatags` need to be added using the eFLOW Visual Designer and they need to be set as *Source Type = UserTag*.

These `metatags` are populated with metadata retrieved from the Supplier Portal and are used throughout the whole flow of collections through the **Invoice Reader** app.


### SPortalImport

Any **Invoice Reader** app that wants to work bi-directionally with the Supplier Portal, needs to have a *Supplier Portal Import Station* *(which is an efSimpleAuto station)*, also known as `SPortalImport`.

This station is responsible for getting through the **SupplierPortalService** new data submitted through the Supplier Portal *Web Parts* and converting / importing that data as new collections into eFLOW.

This station only implements the `OnTimer` event.

The following code goes on this event (eFLOW 5):

``` C#
public override void OnTimer(ITisClientServicesModule oCSM)
        {
            if (!iterating)
            {
                try
                {
                    iterating = true;
                    using (SpLite p = new SpLite())
                    {
                        p.CreateCollectionFromImportFolder(oCSM.Application.AppName, oCSM, "PageOCR");
                    }
                }
                finally
                {
                    iterating = false;
                }
            }
        }
```

The following code goes on this event (eFLOW 4.5):

``` C#
public override void OnTimer(TiS.Core.eFlowAPI.ITisClientServicesModule oCSM)
        {
            if (!iterating)
            {
                try
                {
                    iterating = true;
                    using (SpLite p = new SpLite())
                    {
                        p.CreateCollectionFromImportFolder(oCSM.Application.AppName, oCSM, "PageOCR");
                    }
                }
                finally
                {
                    iterating = false;
                }
            }
        }
```

Here's the full code for the whole `SPortalImport` station customization (eFLOW 5):

``` C#
using System;
using System.Collections.Generic;
using System.Text;

using TiS.Core.TisCommon;
using TiS.Core.Domain;
using TiS.Core.Common;
using TiS.Core.Application;
using TiS.Core.Application.Interfaces;
using TiS.Core.Application.DataModel.Dynamic;
using TiS.Core.Application.Workflow;

using eFlow.SupplierPortalLite;

namespace IRSupplierPortalDll
{
    public class SPImport : TiS.Core.Application.Events.Station.EventsAdapterSimpleAuto
    {
        bool iterating = false;

        public override void OnTimer(ITisClientServicesModule oCSM)
        {
            if (!iterating)
            {
                try
                {
                    iterating = true;
                    using (SpLite p = new SpLite())
                    {
                        p.CreateCollectionFromImportFolder(oCSM.Application.AppName, oCSM, "PageOCR");
                    }
                }
                finally
                {
                    iterating = false;
                }
            }
        }
    }
}
```

Here's the full code for the whole `SPortalImport` station customization (eFLOW 4.5):

``` C#
using System;
using System.Collections.Generic;
using System.Text;

using TiS.Core.eFlowAPI;
using TiS.Core.PlatformRuntime;
using TiS.Core.eFlowAPI.Events;

using eFlow.SupplierPortalLite;

namespace IRSupplierPortalDll
{
    public class SPImport : EventsAdapterSimpleAuto
    {
        bool iterating = false;

        public override void OnTimer(TiS.Core.eFlowAPI.ITisClientServicesModule oCSM)
        {
            if (!iterating)
            {
                try
                {
                    iterating = true;
                    using (SpLite p = new SpLite())
                    {
                        p.CreateCollectionFromImportFolder(oCSM.Application.AppName, oCSM, "PageOCR");
                    }
                }
                finally
                {
                    iterating = false;
                }
            }
        }
    }
}

```

As you can see, the code is very simple…

Basically an instance of the  **SpSDK** *Lite* library is created:

``` C#
using (SpLite p = new SpLite())
{
}
```

Once the instance has been created, there is just a need to call the `CreateCollectionFromImportFolder` from the **SpSDK** *Lite* library, which looks into the `<appXXImportPath>` folder in order to process the data and metadata fetched by the **SupplierPortalService**.

This method `CreateCollectionFromImportFolder` basically just processes the data and metadata fetched by the **SupplierPortalService** and creates collections on the corresponding eFLOW app.

The method `CreateCollectionFromImportFolder`, just needs the:

- Name of the eFLOW app - *oCSM.Application.AppName*
- The CSM object - *oCSM*
- The name of the next station where the newly created collections will be sent / routed to, which is mostly PageOCR - *"PageOCR"*. 


### FreeProcess

This station is by default part of any **Invoice Reader** app, so it does not have to be explicitly added.

In an eFLOW 5 project, this station will be called **Recognition**.

However, it is necessary to change the routing rule from it to `Completion` and to `SPortalCompl`.

The routing rule from `FreeProcess` to `Completion`, should be set *(using  the eFLOW Visual Designer)* as a custom routing rule as follows:

*NextStation="Completion"*

The routing rule from `FreeProcess` to `SPortalCompl`, should be set *(using  the eFLOW Visual Designer)* as a custom routing rule as follows:

*NextStation="SPortalCompl"*

The only other thing that needs to be done on the `FreeProcess`, is to override the `OnPrePutCollections` event, as follows (eFLOW 4.5):

``` C#
public override void OnPrePutCollections(ITisClientServicesModule oCSM, ref bool bCanPut)
        {
            base.OnPrePutCollections(oCSM, ref bCanPut);

            try
            {
                foreach (ITisCollectionData cd in oCSM.Dynamic.AvailableCollections)
                {
                    string sp = cd.get_NamedUserTags(Tags.SupplierPortalDomainTag);

                    if (sp != String.Empty)
                    {
                        cd.NextStation = Tags.SupplierPortalCompletion;
                        
                        using (SpLite p = new SpLite())
                        {
                            p.SendDataToPortal(cd, oCSM.Application.AppName, oCSM.Session.StationName, cd.Name, true, 1);
                        }
                    }
                }
            }
            catch
            {}
        }
```

on eFLOW 5 (Mailroom):

``` C#
public override void OnPrePutCollections(ITisClientServicesModule oCSM, ref bool bCanPut)
        {
            base.OnPrePutCollections(oCSM, ref bCanPut);

            try
            {
                foreach (ITisCollectionData cd in oCSM.Dynamic.AvailableCollections)
                {
                    string sp = cd.GetNamedUserTags(Tags.SupplierPortalDomainTag);

                    if (sp != String.Empty)
                    {
                        cd.NextStation = Tags.SupplierPortalCompletion;
                        
                        using (SpLite p = new SpLite())
                        {
                            p.SendDataToPortal(cd, oCSM.Application.AppName, oCSM.Session.StationName, cd.Name, true, 1);
                        }
                    }
                }
            }
            catch
            {}
        }
```

Here's the full code (eFLOW 4.5):

``` C#
using System;
using System.Collections.Generic;
using System.Text;

using TiS.DevGER.IR;

using TiS.Core.eFlowAPI;
using TiS.Core.PlatformRuntime;
using TiS.Core.eFlowAPI.Events;

using eFlow.SupplierPortalLite;

namespace IRSupplierPortalDll
{
    public class SPFreeProcess : IRFreeProcessStation
    {
        public override void OnPrePutCollections(ITisClientServicesModule oCSM, ref bool bCanPut)
        {
            base.OnPrePutCollections(oCSM, ref bCanPut);

            try
            {
                foreach (ITisCollectionData cd in oCSM.Dynamic.AvailableCollections)
                {
                    string sp = cd.get_NamedUserTags(Tags.SupplierPortalDomainTag);

                    if (sp != String.Empty)
                    {
                        cd.NextStation = Tags.SupplierPortalCompletion;
                        
                        using (SpLite p = new SpLite())
                        {
                            p.SendDataToPortal(cd, oCSM.Application.AppName, oCSM.Session.StationName, cd.Name, true, 1);
                        }
                    }
                }
            }
            catch
            {}
        }
    }
}

```

Here's the full code (eFLOW 5 - Mailroom):

``` C#
using System;
using System.Collections.Generic;
using System.Text;

using TiS.Core.TisCommon;
using TiS.Core.Domain;
using TiS.Core.Common;
using TiS.Core.Application;
using TiS.Core.Application.Interfaces;
using TiS.Core.Application.DataModel.Dynamic;
using TiS.Core.Application.Workflow;

using eFlow.SupplierPortalLite;

using TiS.StationDeclaration.Recognition;
using TiS.DevGER.MR;

namespace IRSupplierPortalDll
{
    //public class SPFreeProcess : TiS.Core.Application.Events.Station.EventsAdapterSimpleAuto
    public class SPFreeProcess : PostReco
    {
        public override void OnPrePutCollections(ITisClientServicesModule oCSM, ref bool bCanPut)
        {
            base.OnPrePutCollections(oCSM, ref bCanPut);

            try
            {
                foreach (ITisCollectionData cd in oCSM.Dynamic.AvailableCollections)
                {
                    string sp = cd.GetNamedUserTags(Tags.SupplierPortalDomainTag);

                    if (sp != String.Empty)
                    {
                        cd.NextStation = Tags.SupplierPortalCompletion;
                        
                        using (SpLite p = new SpLite())
                        {
                            p.SendDataToPortal(cd, oCSM.Application.AppName, oCSM.Session.StationName, cd.Name, true, 1);
                        }
                    }
                }
            }
            catch
            {}
        }
    }
}
```

The code is again very simple and straightforward.

The class needs to inherit from this **Invoice Reader** interface: *IRFreeProcessStation*.

The next step is to call the base event from the inherited *IRFreeProcessStation* interface, as follows (eFLOW 4.5):

``` C#
base.OnPrePutCollections(oCSM, ref bCanPut);
```

On eFLOW 5 (Mailroom) you must inherit from the *PostReco* interface.

Once the base event from **Invoice Reader** has been overridden, the next thing to do is to iterate through the list of available collections in order to check if any of them proceed from the Supplier Portal *Web Parts*:

On eFLOW 4.5...

``` C#
foreach (ITisCollectionData cd in oCSM.Dynamic.AvailableCollections) 
{
	string sp = cd.get_NamedUserTags(Tags.SupplierPortalDomainTag);

    if (sp != String.Empty)
    {
    }
}
```

On eFLOW 5...

``` C#
foreach (ITisCollectionData cd in oCSM.Dynamic.AvailableCollections) 
{
	string sp = cd.GetNamedUserTags(Tags.SupplierPortalDomainTag);

    if (sp != String.Empty)
    {
    }
}
```

**Notice** that on eFLOW 4.5 *get_NamedUserTags* is used and on eFLOW 5 *GetNamedUserTags* is used.


The `Tags.SupplierPortalDomainTag` constants refers to the *metatag* `SupplierPortal` that was created as part of the Supplier Portal customization *(explained a couple of topics before)*.

If this tag contains a value *(non empty string)*, it means that the collection has originated from the Supplier Portal and not from eFLOW.

Only collections that have originated from the Supplier Portal will be sent to the `SPortalCompl` station, as follows:

``` C#
string sp = cd.get_NamedUserTags(Tags.SupplierPortalDomainTag);

if (sp != String.Empty)
{
	cd.NextStation = Tags.SupplierPortalCompletion;

    using (SpLite p = new SpLite())
    {
     	p.SendDataToPortal(cd, oCSM.Application.AppName, oCSM.Session.StationName, cd.Name, true, 1);
    }
}
```

Collections that do not originate from the Supplier Portal, will be routed as expected to the default `Completion` station.

Once the collection has been routed to the `SPortalCompl` station by:

``` C#
cd.NextStation = Tags.SupplierPortalCompletion;
```

The status of the collect is synced back to the Supplier Portal:

``` C#
using (SpLite p = new SpLite())
{
 	p.SendDataToPortal(cd, oCSM.Application.AppName, oCSM.Session.StationName, cd.Name, true, 1);
}
```
voila!


### SPortalCompl

Any **Invoice Reader** app that wants to work bi-directionally with the Supplier Portal, needs to have a *Supplier Portal online Completion Station* *(which is an efSimpleAuto station)*, also known as `SPortalCompl`.

This station is responsible for waiting for a collection to be *completed* online. 

This station simply *sits and waits* for a collection that has been submitted through the Supplier Portal *Web Parts* to be *validated and completed online*.

If a collection has not been submitted through the Supplier Portal, it will not be routed to the `SPortalCompl` station.

This station basically only implements the `OnTimer` event.

The following code goes on this event:

``` C#
public override void OnTimer(TiS.Core.eFlowAPI.ITisClientServicesModule oCSM)
        {
            if (!iterating)
            {
                try
                {
                    iterating = true;
                    using (SpLite p = new SpLite())
                    {
                        string[] collections = p.GetCollectionsFromStation(oCSM.Application.AppName, oCSM.Session.StationName);

                        for (int i = 0; i <= collections.Length - 1; i++)
                        {
                            p.ForceUnlock(oCSM.Application.AppName, oCSM.Session.StationName, collections[i]);

                            using (Batch b = new Batch(oCSM.Application.AppName, oCSM.Session.StationName))
                            {
                                ITisCollectionData cd = b.Get(collections[i]);

                                bool changed = false;

                                changed = p.GetDataFromPortal(ref cd, oCSM.Application.AppName, oCSM.Session.StationName, cd.Name, String.Empty);

                                if (changed)
                                {
                                    cd.NextStation = "PreExport";

                                    p.SendDataToPortal(cd, oCSM.Application.AppName, cd.NextStation, cd.Name, false, 1);
                                    b.Put(cd);
                                }
                                else
                                {
                                    p.SendDataToPortal(cd, oCSM.Application.AppName, oCSM.Session.StationName, cd.Name, false, 1);
                                    b.Free(cd);
                                }
                            }
                        }
                    }
                }
                catch (Exception ex)
                {

                }
                finally
                {
                    iterating = false;
                }
            }
        }
```

Here's the full code for the whole `SPortalCompl` station customization (eFLOW 4.5):

``` C#
using System;
using System.Collections.Generic;
using System.Text;

using TiS.Core.eFlowAPI;
using TiS.Core.PlatformRuntime;
using TiS.Core.eFlowAPI.Events;

using eFlow.SupplierPortalLite;
using eFlow.CollectionManagement;

namespace IRSupplierPortalDll
{
    public class SPCompl : EventsAdapterSimpleAuto
    {
        bool iterating = false;
        string currentCollection = String.Empty;

        public override void OnPrePutCollections(ITisClientServicesModule oCSM, ref bool bCanPut)
        {
            try
            {
                foreach (ITisCollectionData cd in oCSM.Dynamic.AvailableCollections)
                {
                    bCanPut = false;
                    currentCollection = cd.Name;
                }
            }
            catch { }
        }

        public override void OnTimer(TiS.Core.eFlowAPI.ITisClientServicesModule oCSM)
        {
            if (!iterating)
            {
                try
                {
                    iterating = true;
                    using (SpLite p = new SpLite())
                    {
                        string[] collections = p.GetCollectionsFromStation(oCSM.Application.AppName, oCSM.Session.StationName);

                        for (int i = 0; i <= collections.Length - 1; i++)
                        {
                            p.ForceUnlock(oCSM.Application.AppName, oCSM.Session.StationName, collections[i]);

                            using (Batch b = new Batch(oCSM.Application.AppName, oCSM.Session.StationName))
                            {
                                ITisCollectionData cd = b.Get(collections[i]);

                                bool changed = false;

                                changed = p.GetDataFromPortal(ref cd, oCSM.Application.AppName, oCSM.Session.StationName, cd.Name, String.Empty);

                                if (changed)
                                {
                                    cd.NextStation = "PreExport";

                                    p.SendDataToPortal(cd, oCSM.Application.AppName, cd.NextStation, cd.Name, false, 1);
                                    b.Put(cd);
                                }
                                else
                                {
                                    p.SendDataToPortal(cd, oCSM.Application.AppName, oCSM.Session.StationName, cd.Name, false, 1);
                                    b.Free(cd);
                                }
                            }
                        }
                    }
                }
                catch (Exception ex)
                {

                }
                finally
                {
                    iterating = false;
                }
            }
        }
    }
}

```

Here's the full code for the whole `SPortalCompl` station customization (eFLOW 5):

``` C#
using System;
using System.Collections.Generic;
using System.Text;

using TiS.Core.TisCommon;
using TiS.Core.Domain;
using TiS.Core.Common;
using TiS.Core.Application;
using TiS.Core.Application.Interfaces;
using TiS.Core.Application.DataModel.Dynamic;
using TiS.Core.Application.Workflow;

using eFlow.SupplierPortalLite;
using eFlow.CollectionManagement;

namespace IRSupplierPortalDll
{
    public class SPCompl : TiS.Core.Application.Events.Station.EventsAdapterSimpleAuto
    {
        bool iterating = false;
        string currentCollection = String.Empty;

        public override void OnPrePutCollections(ITisClientServicesModule oCSM, ref bool bCanPut)
        {
            try
            {
                foreach (ITisCollectionData cd in oCSM.Dynamic.AvailableCollections)
                {
                    bCanPut = false;
                    currentCollection = cd.Name;
                }
            }
            catch { }
        }

        public override void OnTimer(ITisClientServicesModule oCSM)
        {
            if (!iterating)
            {
                try
                {
                    iterating = true;
                    using (SpLite p = new SpLite())
                    {
                        string[] collections = p.GetCollectionsFromStation(oCSM.Application.AppName, oCSM.Session.StationName);

                        for (int i = 0; i <= collections.Length - 1; i++)
                        {
                            p.ForceUnlock(oCSM.Application.AppName, oCSM.Session.StationName, collections[i]);

                            using (Batch b = new Batch(oCSM.Application.AppName, oCSM.Session.StationName))
                            {
                                ITisCollectionData cd = b.Get(collections[i]);

                                bool changed = false;

                                changed = p.GetDataFromPortal(ref cd, oCSM.Application.AppName, oCSM.Session.StationName, cd.Name, String.Empty);

                                if (changed)
                                {
                                    cd.NextStation = "Validate";

                                    p.SendDataToPortal(cd, oCSM.Application.AppName, cd.NextStation, cd.Name, false, 1);
                                    b.Put(cd);
                                }
                                else
                                {
                                    p.SendDataToPortal(cd, oCSM.Application.AppName, oCSM.Session.StationName, cd.Name, false, 1);
                                    b.Free(cd);
                                }
                            }
                        }
                    }
                }
                catch (Exception ex)
                {

                }
                finally
                {
                    iterating = false;
                }
            }
        }
    }
}
```

It's also actually very simple…

On the OnTimer event, because this event fires up by default in eFLOW every 10 seconds, there's a need to have a variable to control that the code is not triggered whilst an operation is already taking place, thus the need to have the variable `iterating`.

By default, the first time, `iterating` is set to *false*.

``` C#
if (!iterating)
{
 // do the rest…
}
```

Once inside, the value of `iterating` is set to *true* until the operation has completed.

The nest step, is to create an instance of the **SpSDK** *lite* library:

``` C#
using (SpLite p = new SpLite())
{
}
```

Afterwards, the next step is to retrieve a list of the collections available on that station using `GetCollectionsFromStation`, which is done as follows:

``` C#
string[] collections = p.GetCollectionsFromStation(oCSM.Application.AppName, oCSM.Session.StationName);
```

The name of eFLOW app and the eFLOW station are passed as parameters.

The names of the available collections are returned in an array of strings, which each item in the array being a name of a collection available on that station.

The next step is to iterate through the array of collection names, as:

``` C#
for (int i = 0; i <= collections.Length - 1; i++) 
{
}
```

Because the OnTimer event does not natively lock / unlock collections whilst it is being used, it is necessary in order to retrieve a collection to force it to become unlock in case, it has remained previously locked for whatever reason. This is done as follows:

``` C#
p.ForceUnlock(oCSM.Application.AppName, oCSM.Session.StationName, collections[i]);
```
The eFLOW app name, the station name and the collection name are passed to the `ForceUnlock` method.

Having then the collection unlocked, it is possible to then retrieve the collection data by creating an instance of the [Collection Management SDK](http://doksend.com/eFlowSdk/):

``` C#
using (Batch b = new Batch(oCSM.Application.AppName, oCSM.Session.StationName))
{
 	//...
}
```

The Collection Management SDK abstracts all the complexity of working with collections, making it very easy; without having to wrangle with all the tricks and lower level issues of the eFLOW CSM API.

For specific details on how to use the Collection Management SDK, please refer to it's [documentation](http://doksend.com/eFlowSdk/).

The collection data, is retrieved through the Collection Management SDK as follows:

``` C#
ITisCollectionData cd = b.Get(collections[i]);
```

Once the collection data has been retrieved, it is necessary to initialise a variable called `changed` to false:

``` C#
bool changed = false;
```

This is necessary because the purpose of the `SPortalCompl` station is to simply `sit and wait` for changes in a collection *(if it has been changed on the Supplier Portal)* and if changes have taken place on the collection and field data *(meaning that someone has validated it's data online through the Supplier Portal)*, the the collection is moved to the next station in the queue, which normally on **Invoice Reader** apps is `PreExport`.

If a collection has not changed it's data on the Supplier Portal, it means that nobody has validated it online, so it will keep on sitting on the `SPortalCompl` *(and therefore not moved to the next station in the queue, i.e. PreExport)*, until it's data has changed *(validated online)*.

The following code snippet, checks if the collection's data has changed on the Supplier Portal *Web Parts*:

``` C#
changed = p.GetDataFromPortal(ref cd, oCSM.Application.AppName, oCSM.Session.StationName, cd.Name, String.Empty);
```

Basically a `ref` *(parameter by reference)* to the `ITisCollectionData` object is passed, followed by the eFLOW app name, the station name and the collection name.

Once it known if the collection data has changed, the metadata is synced back to the Supplier Portal *(using SendDataToPortal)*. It is then sent to the next station in the queue / flow, i.e. to PreExport, with`Put` *(using the Collection Management SDK)*:

``` C#
if (changed)
{
	cd.NextStation = "PreExport";

    p.SendDataToPortal(cd, oCSM.Application.AppName, cd.NextStation, cd.Name, false, 1);
	
	b.Put(cd);
}
```

If the collection data has not changed then the collection is set free *(using the Collection Management SDK)*, leaving it on the same `SPortalCompl` station, basically waiting to see if on the next OnTimer iteration it has changed:

``` C#
else
{
	p.SendDataToPortal(cd, oCSM.Application.AppName, oCSM.Session.StationName, cd.Name, false, 1);
   	
    b.Free(cd);
}
```

The metadata is synced to the Supplier Portal *(using SendDataToPortal)*.

This completes the operation of the station. The final step is to set:

``` C#
iterating = false;
```

So that the process can repeat itself on the next OnTimer event execution.

`SendDataToPortal`, syncs metadata for the collection back to the Supplier Portal.

It basically updates the **MServer** by talking to the *FlexibleDB* wrapper around the MongoDB instance, that the collection has moved to a different station, queue, state or not.

This is also a task that the **SupplierPortalService** does regularly on different intervals, however by calling directly from code the `SendDataToPortal` method, it is assured that the information changes are relayed back to the **MServer** just as it has happened.

### Lite Library

This is the **ONLY** library that should be used for customizations.

The **SpSDK** *Lite* exposes the following methods:

``` C#
#region "CreateCollectionFromImportFolder"

        /// <summary>
        /// CreateCollectionFromImportFolder() --> Creates an eFlow collection from data collected from the import folder 
        /// (retrieved by the Supplier Portal Service). Returns the name of the created collection
        /// </summary>
        /// <param name="eFlowAppName">The name of the eFlow App</param>
        /// <param name="csm">The name of the CSM object</param>
        /// <param name="nextStation">The name of next station where the collections will be sent to</param>
        /// <example><code>string collectionName = CreateCollectionFromImportFolder("IRSupplierPortal", csm, "PageOCR");</code></example>
        public string CreateCollectionFromImportFolder(string eFlowAppName, ITisClientServicesModule csm, string nextStation)
        ```
        
        
``` C#
#region "RemoveDataFromPortal"

        /// <summary>
        /// RemoveDataFromPortal() --> Removes the collection data from the Supplier Portal for 'eFlowCollectionName'. 
        /// The collection can be 'Locked' on eFlow. 
        /// </summary>
        /// <param name="eFlowAppName">The name of the eFlow application</param>
        /// <param name="eFlowCollectionName">The name of the eFlow collection</param>
        /// <param name="customerDomain">The name of the customer assigned to this eFlowAppName</param>
        /// <example><code>s.RemoveDataFromPortal("CLS", "00000323", "speedyservices.com");</code></example>
        public string RemoveDataFromPortal(string eFlowAppName, string eFlowCollectionName, string customerDomain)
```

``` C#
#region "GetDataFromPortal"

        /// <summary>
        /// GetDataFromPortal() --> Gets collection data from the Supplier Portal for 'eFlowAppName', 
        /// 'eFlowStationName' and 'eFlowCollectionName'. The collection must not 'Locked' on eFlow. 
        /// </summary>
        /// <param name="eFlowAppName">The name of the eFlow application</param>
        /// <param name="eFlowStationName">The name of the eFlow station</param>
        /// <param name="eFlowCollectionName">The name of the eFlow collection</param>
        /// <param name="customerDomain">The name of the customer assigned to this eFlowAppName</param>
        /// <example><code>s.GetDataFromPortal("CLS", "Completion", "00000323", "speedyservices.com");</code></example>
        public bool GetDataFromPortal(string eFlowAppName, string eFlowStationName, string eFlowCollectionName,
            string customerDomain)
```

``` C#
#region "SendDataToPortal"

        /// <summary>
        /// SendDataToPortal() --> Send collection data to the Supplier Portal from 'eFlowAppName', 
        /// 'eFlowStationName' and 'eFlowCollectionName'. The collection must not 'Locked' on eFlow. 
        /// </summary>
        /// <param name="eFlowAppName">The name of the eFlow application</param>
        /// <param name="eFlowStationName">The name of the eFlow station</param>
        /// <param name="eFlowCollectionName">The name of the eFlow collection</param>
        /// <param name="requiresOnlineInput">Indicates if this collection requires online data entry / user input</param>
        /// <param name="index">Indicates App's 'stationsToCheckForFields' setting on the SupplierPortalCommon.dll.config file on the eFlow\Bin</param>
        /// <example><code>string response = s.SendDataToPortal("CLS", "Completion", "00000323", 1);</code></example>
        public string SendDataToPortal(string eFlowAppName, string eFlowStationName, string eFlowCollectionName, bool requiresOnlineInput, int index)
```

``` C#
#region "getSetting"

        /// <summary>
        /// _getSetting() --> Gets the value of 'settingname' from 'SupplierPortalCommon.dll.config'.
        /// </summary>
        /// <param name="settingname">The setting from the 'SupplierPortalCommon.dll.config' file</param>
        /// <example><code>string setting = s._getSetting("app01WhoCanSeeInPortal");</code></example>
        public string _getSetting(string settingname)
```

``` C#
#region "ForceUnlock"

        /// <summary>
        /// ForceUnlock() --> Forces an unlock on a locked collection.
        /// </summary>
        /// <param name="appName">The name of the eFlow App to where to get the collections from</param>
        /// <param name="stationName">The name of the eFlow station to where to get the collections from</param>
        /// <param name="cName">The name of the collection to unlock</param>
        /// <example><code>string setting = s.ForceUnlock("IRSupplierPortal", "SPortalCompl", "0000001");</code></example>
        public bool ForceUnlock(string appName, string stationName, string cName)
```

``` C#
#region "GetBin"

        /// <summary>
        /// GetBin() --> Gets the location of the eFlow\Bin folder.
        /// </summary>
        /// <example><code>string setting = s.GetBin();</code></example>
        public string GetBin()
```

``` C#
#region "GetCollectionsFromStation"

        /// <summary>
        /// GetCollectionsFromStation() --> Gets the names of the collections existing on a station / application.
        /// </summary>
        /// <param name="appName">The name of the eFlow App to where to get the collections from</param>
        /// <param name="stationName">The name of the eFlow station to where to get the collections from</param>
        /// <example><code>string setting = s.GetCollectionsFromStation("IRSupplierPortal", "SPortalCompl");</code></example>
        public string[] GetCollectionsFromStation(string appName, string stationName)
```

It also exposes the following constants:

``` C#
// Named Tags
        public const string ImageSourceTag = "ImageSource";
        public const string SupplierPortalTag = "SupplierPortal";
        public const string SupplierPortalDomainTag = "SupplierPortalDomain";
        public const string SupplierPortalSupplierIdTag = "SupplierPortalSupplierId";
        public const string SupplierPortalPONumberTag = "SupplierPortalPONumber";
        public const string SupplierPortalDateTimeTag = "SupplierPortalDateTime";

        public const string SupplierPortalCompletion = "SPortalCompl";
        public const string SupplierPortalAfter = "SPortalAfter";
        public const string SupplierPortalBefore = "SPortalImport";

        public const string efInternal = "efInternal";
```

Obviously, the *Lite* library is not limited to these methods, there are many more that perform internal tasks, however these are not exposed to external libraries or customization.

### Core Library

The *Core* library, is used by the *Lite* library. **ONLY** the *Lire* library should be used for customizations, due to the complexity and abstraction of the *Core* library.

The *Core* library can be however used as a framework to build add on and new features for the *Lite* library for very **advanced** customisations, only through *Professional Services* and by specific advice of the **project owner**.

The *Lite* library, inherits all it's functionality from the *Core* library.

The *Core* library deals with all the low level complexity of HTTP calls to the Supplier Portal, using the Chilkat engine.

The *Core* library exposes the following methods:

``` C#
/// <summary>
        /// GetCollectionData() --> Gets the collection data available within a ITisCollectionData object.
        /// </summary>
        /// <param name="collData">The ITisCollectionData object from where the data will be retrieved</param>
        /// <param name="filterForms">Filter by forms, i.e. just data from form 1, 2 and 3. If null, all forms will be taken into account</param>
        /// <param name="filterFields">Just use the field names indicated here for each form. All fields are not allowed, due to string length on HTPP requests, exceeding limits</param>
        /// <param name="useFormName">Use the form name for each field (if true), otherwise use 'f1', 'f2', etc...</param>
        /// <example><code>s.GetCollectionData(collData);</code></example>
        public string GetCollectionData(ITisCollectionData collData, string[] filterForms, string[] filterFields, bool useFormName)
```

``` C#
/// <summary>
        /// HttpGetCollectionsData() --> Gets all the collections for the table 'customer' for eFlowAppName.
        /// </summary>
        /// <param name="customer">Indicates the name of the customer to which the data is bound to</param>
        /// <param name="eFlowAppName">Indicates the name of the eFlow App to which the data is bound to</param>
        /// <param name="port">Indicates the port to make the HTTP request</param>
        /// <param name="ssl">If SSL is used or not (True or False)</param>
        /// </summary>
        /// <example><code>s.HttpGetCollectionsData("mycompany.com", "CLS", 80, false);</code></example>
        public string HttpGetCollectionsData(string customer, string eFlowAppName, int port, bool ssl)
```

``` C#
/// <summary>
        /// FtpDownload() --> Performs an FTP Download.
        /// </summary>
        /// <param name="folder">Indicates the folder where the file will be uploaded</param>
        /// <param name="localfolders">Indicates the local folders where the file will be downloaded to</param>
        /// <param name="apps">Indicates the eFlow apps for which the download are going to be placed</param>
        /// <param name="hostname">Indicates the host name where the file will be uploaded</param>
        /// <param name="username">Indicates the name of the user allowed to login into the hostname</param>
        /// <param name="pwd">Indicates the password of the user allowed to login into the hostname</param>
        /// <example><code>s.FtpDownload("/images_receive", localfolders, apps, "ftp.myserver.com", "supplierportaluser", "password");</code></example>
        public bool FtpDownload(string folder, string[] localfolders, string[] apps, string hostname, string username, string pwd)
```

``` C#
/// <summary>
        /// FtpSendSimpleFile() --> Performs an FTP Upload, without indicating the customer or eFlow App. Should be used for upload of validations files only.
        /// </summary>
        /// <param name="fn">Indicates the name of the file to upload.</param>
        /// <param name="fnUp">Indicates the name of the file on the server (how it will be called once uploaded).</param>
        /// <param name="folder">Indicates the folder where the file will be uploaded</param>
        /// <param name="hostname">Indicates the host name where the file will be uploaded</param>
        /// <param name="username">Indicates the name of the user allowed to login into the hostname</param>
        /// <param name="pwd">Indicates the password of the user allowed to login into the hostname</param>
        /// <example><code>s.FtpSendSimpleFile("cls.js", "/validations", "ftp.myserver.com", "supplierportaluser", "pwd");</code></example>
        public bool FtpSendSimpleFile(string fn, string fnUp, string folder, string hostname, string username, string pwd)
```

``` C#
/// <summary>
        /// FtpSendFile() --> Performs an FTP Upload.
        /// </summary>
        /// <param name="cust">Indicates the name of supplier portal customer.</param>
        /// <param name="app">Indicates the name of eFlow application.</param>
        /// <param name="fn">Indicates the name of the file to upload.</param>
        /// <param name="fnUp">Indicates the name of the file on the server (how it will be called once uploaded).</param>
        /// <param name="folder">Indicates the folder where the file will be uploaded</param>
        /// <param name="hostname">Indicates the host name where the file will be uploaded</param>
        /// <param name="username">Indicates the name of the user allowed to login into the hostname</param>
        /// <param name="pwd">Indicates the password of the user allowed to login into the hostname</param>
        /// <example><code>s.FtpSendFile("mycompany.com", "CLS", "00000323.tif", "/images", "ftp.myserver.com", "supplierportaluser", "pwd");</code></example>
        public bool FtpSendFile(string cust, string app, string fn, string fnUp, string folder, string hostname, string username, string pwd)
```

``` C#
/// <summary>
        /// FtpCleanupImageWithNoCollections() --> Cleanup images which do not have a corresponding collection on the portal (FTP).
        /// </summary>
        /// <param name="cust">Indicates the name of supplier portal customer.</param>
        /// <param name="app">Indicates the name of eFlow application.</param>
        /// <param name="fn">Indicates the name of the file to upload.</param>
        /// <param name="fnUp">Indicates the name of the file on the server (how it will be called once uploaded).</param>
        /// <param name="folder">Indicates the folder where the file will be uploaded</param>
        /// <param name="hostname">Indicates the host name where the file will be uploaded</param>
        /// <param name="username">Indicates the name of the user allowed to login into the hostname</param>
        /// <param name="pwd">Indicates the password of the user allowed to login into the hostname</param>
        /// <example><code>s.FtpCleanupImageWithNoCollections("mycompany.com", "CLS", "00000323.tif", "/images", "ftp.myserver.com", "supplierportaluser", "pwd");</code></example>
        public bool FtpCleanupImageWithNoCollections(string cust, string app, string fn, string fnUp, string folder, string hostname, string username, string pwd)
```

``` C#
/// <summary>
        /// HttpPostSimple() --> Performs a 'simple' HTPP POST (for CollectionData) request using the Chilkat engine. Returns an HTTP string response.
        /// </summary>
        /// <param name="customer">Indicates the name of the customer to which the data is bound to</param>
        /// <param name="eFlowAppName">Indicates the name of the eFlow App to which the data is bound to</param>
        /// <param name="station">Indicates the name of the eFlow station to which the data is bound to</param>
        /// <param name="collName">Indicates the name of the collection for which the request is valid.</param>
        /// <param name="strData">The data to POST in string format.</param>
        /// <param name="port">Indicates the port to make the HTTP request</param>
        /// <param name="ssl">If SSL is used or not (True or False)</param>
        /// <example><code>s.HttpPostSimple("mycompany.com", "CLS", "00000323", "TEST1|SYSTEM|CLS|00000323|FreeProcess|1|Invoice_Date=|Invoice_Number=|Net_Amount1=|PO_Number=963645|Supplier_Name=|Total_Amount=0.00|VAT_Amount1=|VAT1=|speedyservices.com_CLS-00000323.tif", 80, false);</code></example>
        public string HttpPostSimple(string customer, string eFlowAppName, string collName, string strData, int port, bool ssl)
```

``` C#
/// <summary>
        /// HttpPostCollectionQry() --> Performs an HTPP POST (for a CollectionData query) request using the Chilkat engine. Returns an HTTP string response. 
        /// </summary>
        /// <param name="customer">Indicates the name of the customer to which the data is bound to</param>
        /// <param name="eFlowAppName">Indicates the name of the eFlow App to which the data is bound to</param>
        /// <param name="fn">Indicates the name of the field to query.</param>
        /// <param name="fv">Indicates the value of the field to query..</param>
        /// <param name="port">Indicates the port to make the HTTP request</param>
        /// <param name="ssl">If SSL is used or not (True or False)</param>
        /// <example><code>s.HttpPostCollectionQry("mycompany.com", "CLS", "cln", "00000323", 80, false);</code></example>
        public string HttpPostCollectionQry(string customer, string eFlowAppName, string fn, string fv, int port, bool ssl)
```

``` C#
/// <summary>
        /// HttpPostCollectionTableQry() --> Performs an HTPP POST (for a CollectionData Table query) request using the Chilkat engine. Returns an HTTP string response. 
        /// </summary>
        /// <param name="customer">Indicates the name of the customer to which the data is bound to</param>
        /// <param name="eFlowAppName">Indicates the name of the eFlow App to which the data is bound to</param>
        /// <param name="port">Indicates the port to make the HTTP request</param>
        /// <param name="ssl">If SSL is used or not (True or False)</param>
        /// <example><code>s.HttpPostCollectionTableQry("mycompany.com", "CLS", 80, false);</code></example>
        public string HttpPostCollectionTableQry(string customer, string eFlowAppName, int port, bool ssl)
```

``` C#
/// <summary>
        /// HttpPostCollectionDeleteFirstFound() --> Performs an HTPP POST (for a CollectionData delete) request using the Chilkat engine. 
        /// Returns an HTTP string response. ONLY the FIRST instance of collection data matching 'collectionName' WILL BE DELETED!
        /// </summary>
        /// <param name="tName">Indicates the name of the table from the Supplier Portal where the data will be DELETED from</param>
        /// <param name="collectionName">Indicates the name of the collection for which the request is valid.</param>
        /// <param name="port">Indicates the port to make the HTTP request</param>
        /// <param name="ssl">If SSL is used or not (True or False)</param>
        /// <example><code>s.HttpPostCollectionDeleteFirstFound("mycompany.com", "CLS", "00000323", 80, false);</code></example>
        public string HttpPostCollectionDeleteFirstFound(string customer, string eFlowAppName, string collectionName, int port, bool ssl)
```

``` C#
/// <summary>
        /// HttpPostCollectionDeleteAll() --> Performs an HTPP POST (for a CollectionData delete) request using the Chilkat engine. 
        /// Returns an HTTP string response. ALL instances of collection data matching 'collectionName' WILL BE DELETED!
        /// </summary>
        /// <param name="tName">Indicates the name of the table from the Supplier Portal where the data will be DELETED from</param>
        /// <param name="collectionName">Indicates the name of the collection for which the request is valid.</param>
        /// <param name="port">Indicates the port to make the HTTP request</param>
        /// <param name="ssl">If SSL is used or not (True or False)</param>
        /// <example><code>s.HttpPostCollectionDeleteAll("mycompany.com", "CLS", "00000323", 80, false);</code></example>
        public string HttpPostCollectionDeleteAll(string customer, string eFlowAppName, string collectionName, int port, bool ssl)
```

The *Utils* sub library exposes the following public methods:

``` C#
/// <summary>
            /// "GetFieldBatchInfo" --> Returns the Field Data of particular eFlow Field as a single piped string, which is the format required by the Supplier Portal and Flexible Cloud DB. 
            /// </summary>
            /// <param name="cd">ITisCollectionData instance with the collection's data</param>
            /// <param name="tmpUpFolder">Indicates the name of the temporary upload folder</param>
            /// <param name="appName">Indicates the eFlow App Name</param>
            /// <param name="stName">Indicates the eFlow station from where to get the field data from</param>
            /// <param name="bName">Indicates the eFlow Collection Name from where to get the field data from</param>
            /// <param name="fToCheck">Indicates which fields name to get data from</param>
            /// <param name="fn">Indicates the name of the TIFF file associated with the collection</param>
            /// <param name="origin">Indicates the location from where the collection originated from</param>
            /// <example><code>s.GetFieldBatchInfo(collectionData, "CLS", "FreeMatch", "00000323", "Invoice_Number|PO_Number|Total_Amount|Supplier_Name|Net_Amount1|VAT_Amount1|VAT1|Invoice_Date", out fn, out origin);</code></example>
            public static string[] GetFieldBatchInfo(ITisCollectionData cd, string tmpUpFolder, string appName, string stName, string bName, string fToCheck, out string fn, out string origin)
```

``` C#
/// <summary>
            /// "GetFieldBatchInfo" --> Returns the Field Data of particular eFlow Field as a single piped string, which is the format required by the Supplier Portal and Flexible Cloud DB. 
            /// </summary>
            /// <param name="tmpUpFolder">Indicates the name of the temporary upload folder</param>
            /// <param name="appName">Indicates the eFlow App Name</param>
            /// <param name="stName">Indicates the eFlow station from where to get the field data from</param>
            /// <param name="bName">Indicates the eFlow Collection Name from where to get the field data from</param>
            /// <param name="fToCheck">Indicates which fields name to get data from</param>
            /// <param name="fn">Indicates the name of the TIFF file associated with the collection</param>
            /// <param name="origin">Indicates the location from where the collection originated from</param>
            /// <example><code>s.GetFieldBatchInfo("CLS", "FreeMatch", "00000323", "Invoice_Number|PO_Number|Total_Amount|Supplier_Name|Net_Amount1|VAT_Amount1|VAT1|Invoice_Date", out fn, out origin);</code></example>
            public static string[] GetFieldBatchInfo(string tmpUpFolder, string appName, string stName, string bName, string fToCheck, out string fn, out string origin)
```

``` C#
/// <summary>
            /// "GetExtendedFieldBatchInfo" --> Returns appended extended details for a given collection, such as: MachineName, UserName and TIFF file name. 
            /// </summary>
            /// <param name="origin">Indicate if the collection is originally from eFlow or it was sbumitted via the web (which domain)</param>
            /// <param name="fn">Out param from GetFieldBatchInfo - which indicates the name  of the TIFF file associated to the collection</param>
            /// <param name="creationTime">Indicates the collection's creationTime</param>
            /// <param name="fDomain">Indicates the HTTP path for the file to upload</param>
            /// <param name="fieldInfo">Basic Field info returned from GetFieldBatchInfo</param>
            /// <param name="batchName">Indicates the eFlow Collection Name related to this data</param>
            /// <param name="queueName">Indicates the eFlow station related to this data</param>
            /// <param name="status">Indicates the status of the eFlow Collection</param>
            /// <param name="cust">Indicates the name of the customer associated to this collection, i.e. mycompany.com</param>
            /// <param name="currentApp">Indicates the name of the eFlow App related to this data, i.e. CLS</param>
            /// <param name="bInfo">Result of the execution of this function, which contains the extended batch info</param>
            /// <param name="fnUp">Indicates the name of the TIFF file associated to this collection that's going to be given when uploaded to the Suppiler Portal</param>
            public static void GetExtendedFieldBatchInfo(string origin, string fn, string creationTime, string fDomain, string[] fieldInfo, string batchName, string queueName, string status, string cust, string currentApp, out string bInfo, out string fnUp)
```

``` C#
/// <summary>
            /// "FromPipe" --> Converts a piped string to a string array. 
            /// </summary>
            public static string[] FromPipe(string str)
```

``` C#
/// <summary>
            /// "ToPipe" --> Converts a string array to a piped string. 
            /// </summary>
            public static string ToPipe(string[] arr)
```

``` C#
/// <summary>
            /// "ToSemiColon" --> Converts a string array to a semi-coloned string. 
            /// </summary>
            public static string ToSemiColon(string[] arr)
```

``` C#
/// <summary>
            /// "ExistsInPipeStr" --> Checks if a string value is cointained within a piped string. 
            /// </summary>
            public static bool ExistsInPipeStr(bool contained, string str, string pipestr)
```

It also exposes the following classes, part of the *SpClasses* sub library, used for data serialization / deserialization during sync operations  from / to the Supplier Portal to eFLOW:

``` C#
/// <summary>
        /// "SpTName" --> This class represents an instance the Supplier Portal 'Tables' definitions list. 
        /// Each instance is an item on the 'tbls' table on the Flexible Cloud DB.
        /// </summary>
        public class SpTName
        {
            private string tname; // table name of item on the 'tbls' list
            private string id; // automatic generated id string by the Flexible Cloud DB.

            /// <summary>
            /// "tName" --> Table name of item on the 'tbls' list. 
            /// </summary>
            public string tName
            {
                get { return tname; }
                set { tname = value; }
            }

            /// <summary>
            /// "_id" --> Automatic generated id string by the Flexible Cloud DB. 
            /// </summary>
            public string _id
            {
                get { return id; }
                set { id = value; }
            }
        }

        /// <summary>
        /// "SpTable" --> This class represents the Supplier Portal 'Table' itself which contains collection data from eFlow. 
        /// </summary>
        public class SpTable
        {
            private string _cid; // collection name from eFlow preceeded by a "c_" char, i.e. "c_00000323"
            private string strdata; // collection data from eFlow.
            private string _cln; // Collection name from eFlow preceeded by a "c_" char, i.e. "c_00000323" 
            private string id; // automatic generated id string by the Flexible Cloud DB.

            /// <summary>
            /// "cid" --> Collection name from eFlow preceeded by a "c_" char, i.e. "c_00000323"
            /// used internally by the Flexible Cloud DB.
            /// </summary>
            public string cid
            {
                get { return _cid; }
                set { _cid = value; }
            }

            /// <summary>
            /// "strData" --> Collection data from eFlow, i.e.
            /// "TEST1|SYSTEM|CLS|00000323|FreeProcess|1|Invoice_Date=|Invoice_Number=|Net_Amount1=|PO_Number=963645|Supplier_Name=|Total_Amount=0.00|VAT_Amount1=|VAT1=|speedyservices.com_CLS-00000323.tif"
            /// "machine_name|user_name|eFlowAppName|CollectionName|StationName|CollectionStatus|[FieldName1=[FieldValue1]...]"
            /// </summary>
            public string strData
            {
                get { return strdata; }
                set { strdata = value; }
            }

            /// <summary>
            /// "cln" --> Collection name from eFlow preceeded by a "c_" char, i.e. "c_00000323" 
            /// used by the Flexible Cloud DB and Supplier Portal SDK for querying
            /// </summary>
            public string cln
            {
                get { return _cln; }
                set { _cln = value; }
            }

            /// <summary>
            /// "_id" --> Automatic generated id string by the Flexible Cloud DB.
            /// </summary>
            public string _id
            {
                get { return id; }
                set { id = value; }
            }

            /// <summary>
            /// "eFlowCollectionName" --> Collection name from eFlow without the "c_" char required by the Flexible Cloud DB, 
            /// i.e. "00000323" 
            /// </summary>
            public string eFlowCollectionName
            {
                get { return cln.Replace("c_", ""); }
            }
        }

        /// <summary>
        /// "SpTableResponse" --> .NET representation of json response containing SpTable items. 
        /// </summary>
        public class SpTableResponse
        {
            private SpTable[] _result;

            /// <summary>
            /// "result" --> .NET representation of json response containing SpTable items. 
            /// </summary>
            public SpTable[] result
            {
                get { return _result; }
                set { _result = value; }
            }
        }

        /// <summary>
        /// "SpTNameResponse" --> .NET representation of json response containing SpTName items. 
        /// </summary>
        public class SpTNameResponse
        {
            private SpTName[] _result;

            /// <summary>
            /// "result" --> .NET representation of json response containing SpTName items. 
            /// </summary>
            public SpTName[] result
            {
                get { return _result; }
                set { _result = value; }
            }
        }

        /// <summary>
        /// "SpClassParser" --> Wrapper around the JSON.NET parser. 
        /// </summary>
        public class SpClassParser
        {
            /// <summary>
            /// "FromJson" --> Converts a json response to a .NET class instance.
            /// </summary>
            public static T FromJson<T>(string jsonResult)
            {
                try
                {
                    return JsonConvert.DeserializeObject<T>(jsonResult);
                }
                catch (Exception ex)
                {
                    Logging.WriteLog(ex.ToString());
                    return default(T);
                }
            }
        }
```

Obviously, the *Core* library is not limited to these methods, there are many more that perform internal tasks, however these are not exposed to external libraries or customization.


### SDK VS Structure

`SDK VS proj structure` refers to the **SpSDK** Visual Studio Project structure.

In order to be as back/forward compatible as possible, the development of the **SupplierPortalService** and **SpSDK** was done in Visual Studio 2005, targeting .NET 2.0. *(for eFLOW 4.5)*

For *(for eFLOW 5)* the development of the **SupplierPortalService** and **SpSDK** was done in Visual Studio 2012, targeting .NET 4.0.

This means that this VS solution can be imported also into any higher version of Visual Studio and compiled with a higher .NET version and run fine too.

Even though the original eFLOW 4.5 solution was developed in .NET 2.0, it uses features such as generics, delegates, inheritance, interfaces and polymorphism.

The original eFLOW 4.5 was mostly migrated to eFLOW 5 *(.NET 4.0)* without any major problems, from .NET 2.0.

The **SpSDK** Visual Studio project bundles the:

- SupplierPortalService
- SpSDK Core library
- SpSDK Lite library
- Invoice Reader custom code DLL *(contains the code for the `SPortalImport` and `SPortalCompl` stations)*
- Common shared libraries used by the SupplierPortalService & SpSDK libraries
- [Collection Management SDK](http://doksend.com/eFlowSdk/)
- InputApi & DocCreator libraries *(used to convert PDF's to TIFF's and viceversa)*

The Visual Studio solution looks like this:

- CollectionManagement *(Collection Management SDK)*
- IRSupplierPortalDll *(Customization for any Invoice Reader app)*
- SpSdkCoreTest *(Tests for the SpSDK Core library)*
- SupplierPortalCommon *(Common library for the SupplierPortalService and SpSDK)*
- SupplierPortalDaemon *(Command line exe version of the SupplierPortalService)*
- SupplierPortalSdkCore *(SpSDK Core library)*
- SupplierPortalSdkLite *(SpSDK Lite library)*
- SupplierPortalSdkLiteDemo *(Test app for the SpSDK Lite library)*
- **SupplierPortalService** *(SupplierPortalService)*
- TiS.Engineering.DocCreator *(DocCreator - PDF/TIFF converter)*
- TiS.Engineering.InputApi
- TiS.Engineering.TiffDll90

The main / default / start project is the **SupplierPortalService**.

When executed in debug mode, even though it is Windows service, the code can be stepped through.

In order to run in debug mode the custom code for the `SPortalImport`, `SPortalCompl` and `FreeProcess` stations, the start project must be set to **IRSupplierPortalDll**.


Misc
===========

Some interesting stuff and facts…


Roadmap
---------------

Here's what we are cracking our heads with and expect to have in a second iteration:



- Support for line items on the **MServer** online validation 
	*(being researched / planned)* -> 

	- 	Technologies: *jQuery / Node.js / MongoDB*


- Collection Management SDK port to eFLOW 5 CSM API 
	*(in progress / development)* ->

	- Technologies: *.NET*


- **SpSDK** *Lite* library port to eFLOW 5 CSM API 
	*(in progress / development)* 

	- Technologies: *.NET*


- Image viewer based on PNG rendering (replacement for Google Docs viewer) 	*(being researched / planned)* 

	- Technologies: *jQuery / .NET*


Credits
---------------


© 2013/14 -> The Supplier Portal is a concept from TISEMEA. 
(Last update: 3 March 2014)

### Concept

Concept and idea by NW and TWH. 

Guidelines, guidance and requirements by NW.

### R&D

Supplier Portal **MServer**, **FServer**, **SupplierPortalService**, **SpSDK** and **eFLOW Server customizations**:

Prototyping, Research, Development, Architecture, Design, Engineering, Web Front end, Web Backend, Hosting setup, MongoDB setup/integration, Plugin integrations, [SDKs Development](http://doksend.com/eFlowSdks/), eFLOW integration, Invoice Reader integration, Third party API integrations, Testing, Email Server setup, Syncing algorithm, Documentation by EF.

InputApi & DocCreator by NF, and adapted to the Supplier Portal by EF.

### Contact

Project owner can be reached at: *tis [at] doksend [dot] com*

### Technology

Hosting: [DreamHost](http://www.dreamhost.com/) & [AppFog](https://www.appfog.com/)

Email server: [Google Apps Business](http://www.google.com/enterprise/apps/business/) via [DreamHost](http://www.dreamhost.com/), courtesy of [Doksend](http://doksend.com/)

browserToSync technology: [Doksend](http://doksend.com/) & [DriveVirtual](http://www.drivevirtual.com/)

#### CDN

Content Delivery Networks:

- [Google Ajax APIs](https://www.google.com/)
- [Microsoft Ajax Content Delivery Network](http://www.asp.net/ajaxlibrary/cdn.ashx)
- [CloudFlare JS CDN](http://cdnjs.com/)

#### Dev Environment

eFLOW Server development (**SupplierPortalService**, **SpSDK**, **eFLOW Customizations** and **Collection Management SDK**) done on Visual Studio with .NET 2.0 on Windows XP.

**MServer**, **FServer** and **Flexible Cloud DB** development done on SublimeText, TextWrangler on a Mac OSX Mountain Lion.

Documentation written in Markdown on a Mac OSX Mountain Lion.


#### Proprietary

This project uses proprietary software:

- [Microsoft .NET](http://www.microsoft.com/net)
- [eFLOW](http://www.mycompany.com/solutions/overview/eflow-overview)
- [Chilkat](http://www.chilkatsoft.com/)


#### Open source

This project also uses open source software:

- [jQuery](http://jquery.com/)
- [jQuery Cookie](https://github.com/carhartl/jquery-cookie)
- [jQuery Mobile Browser](http://detectmobilebrowser.com/)
- [jQuery Timer](http://jchavannes.com/jquery-timer/demo)
- [Node.js](http://nodejs.org/)
- [Express](http://expressjs.com/)
- [Mongoose](http://mongoosejs.com/)
- [MongoDB](http://www.mongodb.org/)
- [Flatiron Director](https://github.com/flatiron/director)
- [EasyXDM](http://easyxdm.net/wp/)
- [DropZone.js](http://www.dropzonejs.com/)
- [DataTables](https://datatables.net/)
- [IntroJs](http://usablica.github.io/intro.js/)
- [MetroUI](http://metroui.org.ua/)


Thanks for your time and attention!
