## Classes

<dl>
<dt><a href="#CodePrecision">CodePrecision</a></dt>
<dd><p>Code precision to use for locations.</p>
</dd>
</dl>

## Members

<dl>
<dt><a href="#PRECISIONS">PRECISIONS</a></dt>
<dd><p>All the available precisions.</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#encode">encode(latitude, longitude, precision)</a> ⇒</dt>
<dd><p>Encode a location into an IOTA Area Code.</p>
</dd>
<dt><a href="#decode">decode(iotaAreaCode)</a> ⇒</dt>
<dd><p>Decode an IOTA Area Code into a location.</p>
</dd>
<dt><a href="#fromOpenLocationCode">fromOpenLocationCode(openLocationCode)</a> ⇒</dt>
<dd><p>Convert the Open Location Code to IOTA Area Code.</p>
</dd>
<dt><a href="#toOpenLocationCode">toOpenLocationCode(iotaAreaCode)</a> ⇒</dt>
<dd><p>Convert the IOTA Area Code to Open Location Code.</p>
</dd>
<dt><a href="#extract">extract(trytes)</a> ⇒</dt>
<dd><p>Extract an IOTA Area Code from trytes.</p>
</dd>
<dt><a href="#decreasePrecision">decreasePrecision(iotaAreaCode)</a> ⇒</dt>
<dd><p>Decrease the precision of an area code.</p>
</dd>
<dt><a href="#increasePrecision">increasePrecision(iotaAreaCode)</a> ⇒</dt>
<dd><p>Increase the precision of an area code.</p>
</dd>
<dt><a href="#setPrecision">setPrecision(iotaAreaCode, codePrecision)</a> ⇒</dt>
<dd><p>Set the precision of an area code.</p>
</dd>
<dt><a href="#getPrecisionDimensions">getPrecisionDimensions(codePrecision)</a> ⇒</dt>
<dd><p>Get the display dimensions for a area code precision.</p>
</dd>
<dt><a href="#isValid">isValid(iotaAreaCode)</a> ⇒</dt>
<dd><p>Is the IOTA Area Code valid.</p>
</dd>
<dt><a href="#isValidPartial">isValidPartial(iotaAreaCode)</a> ⇒</dt>
<dd><p>Is the IOTA Area Code a valid partial code.</p>
</dd>
</dl>

<a name="CodePrecision"></a>

## CodePrecision
Code precision to use for locations.

**Kind**: global class  

* [CodePrecision](#CodePrecision)
    * [.NORMAL](#CodePrecision.NORMAL)
    * [.EXTRA](#CodePrecision.EXTRA)

<a name="CodePrecision.NORMAL"></a>

### CodePrecision.NORMAL
Provides a normal precision code, approximately 14x14 meters.

**Kind**: static property of [<code>CodePrecision</code>](#CodePrecision)  
<a name="CodePrecision.EXTRA"></a>

### CodePrecision.EXTRA
Provides an extra precision code, approximately 2x3 meters.

**Kind**: static property of [<code>CodePrecision</code>](#CodePrecision)  
<a name="PRECISIONS"></a>

## PRECISIONS
All the available precisions.

**Kind**: global variable  
<a name="encode"></a>

## encode(latitude, longitude, precision) ⇒
Encode a location into an IOTA Area Code.

**Kind**: global function  
**Returns**: The IOTA Area Code for the location.  

| Param | Description |
| --- | --- |
| latitude | The latitude in signed decimal degrees. Values less than -90 will be clipped to -90, values over 90 will be clipped to 90. |
| longitude | The longitude in signed decimal degrees. This will be normalised to the range -180 to 180. |
| precision | The desired code length. If omitted, CodePrecision.NORMAL will be used. For precision CodePrecision.EXTRA is recommended. |

<a name="decode"></a>

## decode(iotaAreaCode) ⇒
Decode an IOTA Area Code into a location.

**Kind**: global function  
**Returns**: The location object.  

| Param | Description |
| --- | --- |
| iotaAreaCode | The IOTA Area Code to convert. |

<a name="fromOpenLocationCode"></a>

## fromOpenLocationCode(openLocationCode) ⇒
Convert the Open Location Code to IOTA Area Code.

**Kind**: global function  
**Returns**: The IOTA Area Code.  

| Param | Description |
| --- | --- |
| openLocationCode | The Open Location Code to convert. |

<a name="toOpenLocationCode"></a>

## toOpenLocationCode(iotaAreaCode) ⇒
Convert the IOTA Area Code to Open Location Code.

**Kind**: global function  
**Returns**: The Open Location Code.  

| Param | Description |
| --- | --- |
| iotaAreaCode | The IOTA Area Code to convert. |

<a name="extract"></a>

## extract(trytes) ⇒
Extract an IOTA Area Code from trytes.

**Kind**: global function  
**Returns**: The IOTA Area Code if one could be extracted, or undefined.  

| Param | Description |
| --- | --- |
| trytes | The trytes from which to try and extract the IOTA Area Code. |

<a name="decreasePrecision"></a>

## decreasePrecision(iotaAreaCode) ⇒
Decrease the precision of an area code.

**Kind**: global function  
**Returns**: The decreased precision area code.  

| Param | Description |
| --- | --- |
| iotaAreaCode | The IOTA Area Code to decrease the precision. |

<a name="increasePrecision"></a>

## increasePrecision(iotaAreaCode) ⇒
Increase the precision of an area code.

**Kind**: global function  
**Returns**: The increased precision area code.  

| Param | Description |
| --- | --- |
| iotaAreaCode | The IOTA Area Code to increase the precision. |

<a name="setPrecision"></a>

## setPrecision(iotaAreaCode, codePrecision) ⇒
Set the precision of an area code.

**Kind**: global function  
**Returns**: The updated precision area code.  

| Param | Description |
| --- | --- |
| iotaAreaCode | The IOTA Area Code to set the precision. |
| codePrecision | The new precision to set. |

<a name="getPrecisionDimensions"></a>

## getPrecisionDimensions(codePrecision) ⇒
Get the display dimensions for a area code precision.

**Kind**: global function  
**Returns**: The display dimensions for the code precision.  

| Param | Description |
| --- | --- |
| codePrecision | The precision of an area code. |

<a name="isValid"></a>

## isValid(iotaAreaCode) ⇒
Is the IOTA Area Code valid.

**Kind**: global function  
**Returns**: True if the code is valid.  

| Param | Description |
| --- | --- |
| iotaAreaCode | The IOTA Area Code to validate. |

<a name="isValidPartial"></a>

## isValidPartial(iotaAreaCode) ⇒
Is the IOTA Area Code a valid partial code.

**Kind**: global function  
**Returns**: True if the code is a partial.  

| Param | Description |
| --- | --- |
| iotaAreaCode | The IOTA Area Code to validate. |

