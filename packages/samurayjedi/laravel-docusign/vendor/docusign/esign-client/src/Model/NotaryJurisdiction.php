<?php
/**
 * NotaryJurisdiction
 *
 * PHP version 7.4
 *
 * @category Class
 * @package  DocuSign\eSign
 * @author   Swagger Codegen team <apihelp@docusign.com>
 * @license  The DocuSign PHP Client SDK is licensed under the MIT License.
 * @link     https://github.com/swagger-api/swagger-codegen
 */

/**
 * DocuSign REST API
 *
 * The DocuSign REST API provides you with a powerful, convenient, and simple Web services API for interacting with DocuSign.
 *
 * OpenAPI spec version: v2.1
 * Contact: devcenter@docusign.com
 * Generated by: https://github.com/swagger-api/swagger-codegen.git
 * Swagger Codegen version: 2.4.21
 */

/**
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen
 * Do not edit the class manually.
 */

namespace DocuSign\eSign\Model;

use \ArrayAccess;
use DocuSign\eSign\ObjectSerializer;

/**
 * NotaryJurisdiction Class Doc Comment
 *
 * @category    Class
 * @description A notary jurisdiction.
 * @package     DocuSign\eSign
 * @author      Swagger Codegen team <apihelp@docusign.com>
 * @license     The DocuSign PHP Client SDK is licensed under the MIT License.
 * @link        https://github.com/swagger-api/swagger-codegen
 */
class NotaryJurisdiction implements ModelInterface, ArrayAccess
{
    const DISCRIMINATOR = null;

    /**
      * The original name of the model.
      *
      * @var string
      */
    protected static $swaggerModelName = 'notaryJurisdiction';

    /**
      * Array of property to type mappings. Used for (de)serialization
      *
      * @var string[]
      */
    protected static $swaggerTypes = [
        'commission_expiration' => '?string',
        'commission_id' => '?string',
        'county' => '?string',
        'error_details' => '\DocuSign\eSign\Model\ErrorDetails',
        'jurisdiction' => '\DocuSign\eSign\Model\Jurisdiction',
        'registered_name' => '?string',
        'seal_type' => '?string'
    ];

    /**
      * Array of property to format mappings. Used for (de)serialization
      *
      * @var string[]
      */
    protected static $swaggerFormats = [
        'commission_expiration' => null,
        'commission_id' => null,
        'county' => null,
        'error_details' => null,
        'jurisdiction' => null,
        'registered_name' => null,
        'seal_type' => null
    ];

    /**
     * Array of property to type mappings. Used for (de)serialization
     *
     * @return array
     */
    public static function swaggerTypes()
    {
        return self::$swaggerTypes;
    }

    /**
     * Array of property to format mappings. Used for (de)serialization
     *
     * @return array
     */
    public static function swaggerFormats()
    {
        return self::$swaggerFormats;
    }

    /**
     * Array of attributes where the key is the local name,
     * and the value is the original name
     *
     * @var string[]
     */
    protected static $attributeMap = [
        'commission_expiration' => 'commissionExpiration',
        'commission_id' => 'commissionId',
        'county' => 'county',
        'error_details' => 'errorDetails',
        'jurisdiction' => 'jurisdiction',
        'registered_name' => 'registeredName',
        'seal_type' => 'sealType'
    ];

    /**
     * Array of attributes to setter functions (for deserialization of responses)
     *
     * @var string[]
     */
    protected static $setters = [
        'commission_expiration' => 'setCommissionExpiration',
        'commission_id' => 'setCommissionId',
        'county' => 'setCounty',
        'error_details' => 'setErrorDetails',
        'jurisdiction' => 'setJurisdiction',
        'registered_name' => 'setRegisteredName',
        'seal_type' => 'setSealType'
    ];

    /**
     * Array of attributes to getter functions (for serialization of requests)
     *
     * @var string[]
     */
    protected static $getters = [
        'commission_expiration' => 'getCommissionExpiration',
        'commission_id' => 'getCommissionId',
        'county' => 'getCounty',
        'error_details' => 'getErrorDetails',
        'jurisdiction' => 'getJurisdiction',
        'registered_name' => 'getRegisteredName',
        'seal_type' => 'getSealType'
    ];

    /**
     * Array of attributes where the key is the local name,
     * and the value is the original name
     *
     * @return array
     */
    public static function attributeMap()
    {
        return self::$attributeMap;
    }

    /**
     * Array of attributes to setter functions (for deserialization of responses)
     *
     * @return array
     */
    public static function setters()
    {
        return self::$setters;
    }

    /**
     * Array of attributes to getter functions (for serialization of requests)
     *
     * @return array
     */
    public static function getters()
    {
        return self::$getters;
    }

    /**
     * The original name of the model.
     *
     * @return string
     */
    public function getModelName()
    {
        return self::$swaggerModelName;
    }

    

    

    /**
     * Associative array for storing property values
     *
     * @var mixed[]
     */
    protected $container = [];

    /**
     * Constructor
     *
     * @param mixed[] $data Associated array of property values
     *                      initializing the model
     */
    public function __construct(array $data = null)
    {
        $this->container['commission_expiration'] = isset($data['commission_expiration']) ? $data['commission_expiration'] : null;
        $this->container['commission_id'] = isset($data['commission_id']) ? $data['commission_id'] : null;
        $this->container['county'] = isset($data['county']) ? $data['county'] : null;
        $this->container['error_details'] = isset($data['error_details']) ? $data['error_details'] : null;
        $this->container['jurisdiction'] = isset($data['jurisdiction']) ? $data['jurisdiction'] : null;
        $this->container['registered_name'] = isset($data['registered_name']) ? $data['registered_name'] : null;
        $this->container['seal_type'] = isset($data['seal_type']) ? $data['seal_type'] : null;
    }

    /**
     * Show all the invalid properties with reasons.
     *
     * @return array invalid properties with reasons
     */
    public function listInvalidProperties()
    {
        $invalidProperties = [];

        return $invalidProperties;
    }

    /**
     * Validate all the properties in the model
     * return true if all passed
     *
     * @return bool True if all properties are valid
     */
    public function valid()
    {
        return count($this->listInvalidProperties()) === 0;
    }


    /**
     * Gets commission_expiration
     *
     * @return ?string
     */
    public function getCommissionExpiration()
    {
        return $this->container['commission_expiration'];
    }

    /**
     * Sets commission_expiration
     *
     * @param ?string $commission_expiration 
     *
     * @return $this
     */
    public function setCommissionExpiration($commission_expiration)
    {
        $this->container['commission_expiration'] = $commission_expiration;

        return $this;
    }

    /**
     * Gets commission_id
     *
     * @return ?string
     */
    public function getCommissionId()
    {
        return $this->container['commission_id'];
    }

    /**
     * Sets commission_id
     *
     * @param ?string $commission_id 
     *
     * @return $this
     */
    public function setCommissionId($commission_id)
    {
        $this->container['commission_id'] = $commission_id;

        return $this;
    }

    /**
     * Gets county
     *
     * @return ?string
     */
    public function getCounty()
    {
        return $this->container['county'];
    }

    /**
     * Sets county
     *
     * @param ?string $county 
     *
     * @return $this
     */
    public function setCounty($county)
    {
        $this->container['county'] = $county;

        return $this;
    }

    /**
     * Gets error_details
     *
     * @return \DocuSign\eSign\Model\ErrorDetails
     */
    public function getErrorDetails()
    {
        return $this->container['error_details'];
    }

    /**
     * Sets error_details
     *
     * @param \DocuSign\eSign\Model\ErrorDetails $error_details Array or errors.
     *
     * @return $this
     */
    public function setErrorDetails($error_details)
    {
        $this->container['error_details'] = $error_details;

        return $this;
    }

    /**
     * Gets jurisdiction
     *
     * @return \DocuSign\eSign\Model\Jurisdiction
     */
    public function getJurisdiction()
    {
        return $this->container['jurisdiction'];
    }

    /**
     * Sets jurisdiction
     *
     * @param \DocuSign\eSign\Model\Jurisdiction $jurisdiction Description of the jurisdiction for this notary. This is a read-only property.
     *
     * @return $this
     */
    public function setJurisdiction($jurisdiction)
    {
        $this->container['jurisdiction'] = $jurisdiction;

        return $this;
    }

    /**
     * Gets registered_name
     *
     * @return ?string
     */
    public function getRegisteredName()
    {
        return $this->container['registered_name'];
    }

    /**
     * Sets registered_name
     *
     * @param ?string $registered_name 
     *
     * @return $this
     */
    public function setRegisteredName($registered_name)
    {
        $this->container['registered_name'] = $registered_name;

        return $this;
    }

    /**
     * Gets seal_type
     *
     * @return ?string
     */
    public function getSealType()
    {
        return $this->container['seal_type'];
    }

    /**
     * Sets seal_type
     *
     * @param ?string $seal_type 
     *
     * @return $this
     */
    public function setSealType($seal_type)
    {
        $this->container['seal_type'] = $seal_type;

        return $this;
    }
    /**
     * Returns true if offset exists. False otherwise.
     *
     * @param integer $offset Offset
     *
     * @return boolean
     */
    #[\ReturnTypeWillChange]
    public function offsetExists($offset)
    {
        return isset($this->container[$offset]);
    }

    /**
     * Gets offset.
     *
     * @param integer $offset Offset
     *
     * @return mixed
     */
    #[\ReturnTypeWillChange]
    public function offsetGet($offset)
    {
        return isset($this->container[$offset]) ? $this->container[$offset] : null;
    }

    /**
     * Sets value based on offset.
     *
     * @param integer $offset Offset
     * @param mixed   $value  Value to be set
     *
     * @return void
     */
    #[\ReturnTypeWillChange]
    public function offsetSet($offset, $value)
    {
        if (is_null($offset)) {
            $this->container[] = $value;
        } else {
            $this->container[$offset] = $value;
        }
    }

    /**
     * Unsets offset.
     *
     * @param integer $offset Offset
     *
     * @return void
     */
    #[\ReturnTypeWillChange]
    public function offsetUnset($offset)
    {
        unset($this->container[$offset]);
    }

    /**
     * Gets the string presentation of the object
     *
     * @return string
     */
    public function __toString()
    {
        if (defined('JSON_PRETTY_PRINT')) { // use JSON pretty print
            return json_encode(
                ObjectSerializer::sanitizeForSerialization($this),
                JSON_PRETTY_PRINT
            );
        }

        return json_encode(ObjectSerializer::sanitizeForSerialization($this));
    }
}

