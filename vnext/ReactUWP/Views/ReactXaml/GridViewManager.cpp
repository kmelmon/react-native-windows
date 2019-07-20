// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

#include "pch.h"

#include "GridViewManager.h"

#include <Views/ShadowNodeBase.h>

#include <Utils/PropertyUtils.h>
#include <Utils/ValueUtils.h>

#include <winrt/Windows.UI.Xaml.Documents.h>

namespace winrt {
using namespace Windows::UI::Xaml::Documents;
} // namespace winrt

namespace react {
namespace uwp {

GridViewManager::GridViewManager(
    const std::shared_ptr<IReactInstance> &reactInstance)
    : Super(reactInstance) {}

const char *GridViewManager::GetName() const {
  return "RCTGrid";
}

XamlView GridViewManager::CreateViewCore(int64_t tag) {
  auto grid = winrt::Grid();
  return grid;
}

folly::dynamic GridViewManager::GetNativeProps() const {
  auto props = Super::GetNativeProps();

  props.update(folly::dynamic::object("RowDefinitions", "string")(
      "ColumnDefinitions", "string"));

  return props;
}
void GridViewManager::UpdateProperties(
    ShadowNodeBase *nodeToUpdate,
    const folly::dynamic &reactDiffMap) {
  auto grid = nodeToUpdate->GetView().as<winrt::Grid>();
  if (grid == nullptr)
    return;

  for (const auto &pair : reactDiffMap.items()) {
    const std::string &propertyName = pair.first.getString();
    const folly::dynamic &propertyValue = pair.second;

    if (propertyName == "RowDefinitions") {
      if (propertyValue.isString()) {
        std::istringstream overallStream(propertyValue.asString());
        std::string rowdef;
        while (getline(overallStream, rowdef, ',')) {
          std::istringstream rowdefstream(rowdef);
          std::string type;
          std::string value;
          getline(rowdefstream, type, '=');
          getline(rowdefstream, value, '=');
          auto rd = winrt::Windows::UI::Xaml::Controls::RowDefinition();
          if (type == "Height") {
            if (value == "*") {
              rd.Height({1.0, winrt::Windows::UI::Xaml::GridUnitType::Star});
            } else if (value == "Auto") {
              rd.Height({1.0, winrt::Windows::UI::Xaml::GridUnitType::Auto});
            } else {
              rd.Height({atof(value.c_str()),
                         winrt::Windows::UI::Xaml::GridUnitType::Pixel});
            }
          }
          grid.RowDefinitions().Append(rd);
        }
      }
    } else if (propertyName == "ColumnDefinitions") {
      if (propertyValue.isString()) {
        std::istringstream overallStream(propertyValue.asString());
        std::string columndef;
        while (getline(overallStream, columndef, ',')) {
          std::istringstream columndefstream(columndef);
          std::string type;
          std::string value;
          getline(columndefstream, type, '=');
          getline(columndefstream, value, '=');
          auto cd = winrt::Windows::UI::Xaml::Controls::ColumnDefinition();
          if (type == "Width") {
            if (value == "*") {
              cd.Width({1.0, winrt::Windows::UI::Xaml::GridUnitType::Star});
            } else if (value == "Auto") {
              cd.Width({1.0, winrt::Windows::UI::Xaml::GridUnitType::Auto});
            } else {
              cd.Width({atof(value.c_str()),
                        winrt::Windows::UI::Xaml::GridUnitType::Pixel});
            }
          }
          grid.ColumnDefinitions().Append(cd);
        }
      }
    }
  }

  Super::UpdateProperties(nodeToUpdate, reactDiffMap);
}

} // namespace uwp
} // namespace react
